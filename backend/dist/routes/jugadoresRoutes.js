"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jugadoresController_1 = require("../controllers/jugadoresController");
const router = (0, express_1.Router)();
router.get("/", jugadoresController_1.jugadoresController);
router.get("/:nombre", jugadoresController_1.jugadorDetalleController);
exports.default = router;
