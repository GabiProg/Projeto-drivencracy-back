import { OpcaoVoto } from "../controllers/choiceController.js";
import { Router } from "express";

const router = Router();

router.post("/choice", OpcaoVoto);

export default router;