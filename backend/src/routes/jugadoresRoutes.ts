import { Router } from "express";
import type { RequestHandler } from "express";
import { jugadoresController, jugadorDetalleController } from "../controllers/jugadoresController";

const router = Router();

router.get("/", jugadoresController as RequestHandler);
router.get("/:nombre", jugadorDetalleController);


export default router;