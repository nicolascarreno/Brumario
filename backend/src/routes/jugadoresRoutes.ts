import { Router } from "express";
import type { RequestHandler } from "express";
import { jugadoresController, jugadorDetalleController, jugadoresSinDetallesController } from "../controllers/jugadoresController";

const router = Router();

router.get("/", jugadoresController as RequestHandler);
router.get("/sin-detalles", jugadoresSinDetallesController as RequestHandler);
router.get("/:nombre", jugadorDetalleController);


export default router;