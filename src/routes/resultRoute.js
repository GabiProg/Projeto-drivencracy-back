import { EnviarVotos } from "../controllers/resultController.js";
import { Router } from "express";

const router = Router();

router.post("/choice/:id/vote", EnviarVotos);

export default router;