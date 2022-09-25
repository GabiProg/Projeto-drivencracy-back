import { db, ObjectId } from "../dbStrategy/mongodb.js"
import dayjs from "dayjs";

export async function OpcaoVoto (req, res) {
    const { title, pollId } = req.body;

    if (!title) {
        return res.sendStatus(422);
    }

    try {
        const verificaTitulo = await db.collection("opcao").findOne({title});
        if (verificaTitulo) {
            return res.sendStatus(409);
        }

        const verificaEnquete = await db.collection("enquetes").findOne({_id : ObjectId(pollId)});
        if (!verificaEnquete) {
            return res.sendStatus(404);
        }
       
        if ((dayjs(verificaEnquete.expireAt).isBefore(dayjs()))) {
            return res.sendStatus(403);
        }

        await db.collection("opcao").insertOne({
            title,
            pollId: ObjectId(verificaEnquete._id)
        })

        const enviaOpcao = await db.collection("opcao").find({title}).toArray();
        res.status(201).send(enviaOpcao);

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function RetornaOpcoes (req, res) {
    const { id } = req.params;

    try {
        const listaEnquetes = await db.collection("enquetes").findOne({_id : ObjectId(id)});
        if (!listaEnquetes) {
            return res.sendStatus(404);
        }

        const listaOpcoes = await db.collection("opcao").find({pollId: ObjectId(listaEnquetes._id)}).toArray();
        res.status(200).send(listaOpcoes);

    } catch (error) {
        res.sendStatus(500);
    }
}