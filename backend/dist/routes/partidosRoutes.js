"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const partidosController_1 = require("../controllers/partidosController");
const router = (0, express_1.Router)();
router.get("/", partidosController_1.partidosController);
router.get("/:nro", partidosController_1.partidoDetalleController);
exports.default = router;
