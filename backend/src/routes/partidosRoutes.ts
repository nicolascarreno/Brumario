import { Router } from "express";
import type { RequestHandler } from "express";
import { partidoDetalleController, partidosController } from "../controllers/partidosController";

const router = Router();

router.get("/", partidosController as RequestHandler);
router.get("/:nro", partidoDetalleController);

export default router;