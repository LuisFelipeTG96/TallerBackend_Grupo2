import 'dotenv/config';

import express from "express";
import _cors from "./config/cors.js";
import api from "./routes.js";
import PUERTO from "./utils/constantes.js";

const app = express();
app.use(express.json());
app.use(_cors);

app.use("/api/v1", api);

app.use(express.static('uploads'));

app.listen(PUERTO, () => {
    console.log('Listening on ' + PUERTO);
});
