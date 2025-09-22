import { Router } from "express";
import type { RequestHandler } from "express";
import { partidosController } from "../controllers/partidosController";

const router = Router();

router.get("/", partidosController as RequestHandler);

export default router;