import { OpcaoVoto, RetornaOpcoes } from "../controllers/choiceController.js";
import { Router } from "express";

const router = Router();

router.post("/choice", OpcaoVoto);
router.get("/poll/:id/choice", RetornaOpcoes);

export default router;