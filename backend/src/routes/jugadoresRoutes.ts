import { Router } from "express";
import type { RequestHandler } from "express";
import { jugadoresController } from "../controllers/jugadoresController";

const router = Router();

router.get("/", jugadoresController as RequestHandler);


export default router;