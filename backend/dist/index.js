"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jugadoresRoutes_1 = __importDefault(require("./routes/jugadoresRoutes"));
const partidosRoutes_1 = __importDefault(require("./routes/partidosRoutes"));
const app = (0, express_1.default)();
const PORT = 4000;
const db_1 = __importDefault(require("./db/db"));
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use("/jugadores", jugadoresRoutes_1.default);
app.use("/partidos", partidosRoutes_1.default);
app.get('/hello', (req, res) => {
    res.json({ message: 'Hola desde el backend!' });
});
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
