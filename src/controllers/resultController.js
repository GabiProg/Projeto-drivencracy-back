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
            choiceId: confereOpcao._id
        });
        
        res.sendStatus(201);

    } catch (error) {
        res.sendStatus(500);
    }
}