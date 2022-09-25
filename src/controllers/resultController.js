import { db, ObjectId } from "../dbStrategy/mongodb.js";
import dayjs from "dayjs";

export async function EnviarVotos (req, res) {
    const { id } = req.params;
   
    try {
        const confereOpcao = await db.collection("opcao").findOne({_id : ObjectId(id)});
        if (!confereOpcao) {
            return res.sendStatus(404);
        }

        const verificaEnquete = await db.collection("enquetes").findOne({_id : ObjectId(confereOpcao.pollId)});
        if ((dayjs(verificaEnquete.expireAt).isBefore(dayjs()))) {
            return res.sendStatus(403);
        }

        await db.collection("voto").insertOne({
            createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
            choiceId: ObjectId(confereOpcao._id)
        });

        res.status(201).send("Voto adicionado.");

    } catch (error) {
        res.sendStatus(500);
    }
}

export async function EnviarResultado (req, res) {
    const { id } = req.params;

    try {
        const verificaEnquete = await db.collection("enquetes").findOne({_id : ObjectId(id)});
        if (!verificaEnquete) {
            return res.sendStatus(404);
        }

        const confereOpcao = await db.collection("opcao").find({pollId : ObjectId(verificaEnquete._id)}).toArray();
        
        let opcaoNome = "";
        let maisVotados = 0;
        for (let i = 0; i < confereOpcao.length; i++) {
            const votos = await db.collection("voto").find({choiceId: confereOpcao[i]._id}).toArray();
            if (votos.length > maisVotados) {
                opcaoNome = confereOpcao[i].title;
                maisVotados = votos.length;
            }
        }

        res.status(200).send({
            _id: verificaEnquete._id,
            title: verificaEnquete.title,
            expireAt: verificaEnquete.expireAt,
            result : {
                title: opcaoNome,
                votes: maisVotados
            }
        });

    } catch (error) {
        res.sendStatus(500);
    }
}