import { EnviarVotos, EnviarResultado } from "../controllers/resultController.js";
import { Router } from "express";

const router = Router();

router.post("/choice/:id/vote", EnviarVotos);
router.get("/poll/:id/result", EnviarResultado);

export default router;