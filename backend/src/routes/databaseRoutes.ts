import { Router } from "express";
import { resetDBController } from "../controllers/databaseController";

console.log("databaseRoutes file loaded");

const router = Router();

router.post("/reset", resetDBController);


export default router;