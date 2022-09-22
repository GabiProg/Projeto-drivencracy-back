import { db } from "../dbStrategy/mongodb.js";
import dayjs from "dayjs";

const date = dayjs().add(1, 'month').format("YYYY-MM-DD HH:mm");

export async function criarEnquetes (req, res) {
    const { title, expireAt } = req.body;

    if (!title) {
        return res.sendStatus(422);
    }
    
    try {
        if (!expireAt) {
            await db.collection("enquetes").insertOne({
                title,
                expireAt: date
            });

            const enqueteCriada = await db.collection("enquetes").find({title}).toArray();
            res.status(201).send(enqueteCriada);
            return
        }

        await db.collection("enquetes").insertOne({
            title,
            expireAt
        });
        const enqueteCriada = await db.collection("enquetes").find({title}).toArray();
        res.status(201).send(enqueteCriada);

    } catch (error) {
        res.sendStaus(500);
    }
}

export async function retornaEnquetes (req, res) {
    try {
        const listaEnquetes = await db.collection("enquetes").find().toArray();

        res.send(listaEnquetes);
    } catch (error) {
        res.sendStaus(500);
    }
}