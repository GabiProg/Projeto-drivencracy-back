import { db, ObjectId } from "../dbStrategy/mongodb.js"
import dayjs from "dayjs";

export async function OpcaoVoto (req, res) {
    const { title, pollId } = req.body;
    
    console.log(pollId)

    if (!title) {
        return res.sendStatus(422);
    }

    try {
        const verificaTitulo = await db.collection("opcao").findOne({title});
        if (verificaTitulo) {
            return res.sendStatus(409);
        }

        const verificaEnquete = await db.collection("enquetes").findOne({_id : ObjectId(pollId)});
        console.log(verificaEnquete);
        if (!verificaEnquete) {
            return res.sendStatus(404);
        }
       
        if ((dayjs(verificaEnquete.expireAt).isBefore(dayjs()))) {
            return res.sendStatus(403);
        }

        await db.collection("opcao").insertOne({
            title,
            pollId
        })

        const enviaOpcao = await db.collection("opcao").find({title}).toArray();
        res.status(201).send(enviaOpcao);

    } catch (error) {
        res.sendStatus(500);
    }
}