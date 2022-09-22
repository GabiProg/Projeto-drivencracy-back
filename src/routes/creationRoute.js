import { criarEnquetes, retornaEnquetes } from "../controllers/creationController.js";
import { Router } from "express";

const router = Router();

router.post("/poll", criarEnquetes);
router.get("/poll", retornaEnquetes);

export default router;