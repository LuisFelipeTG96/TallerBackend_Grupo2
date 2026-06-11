import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import api from "./routes.js";

const corsOptions = {
    origin: "https://webfront.mipaginaweb.com/",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

const app= express();
app.use(bodyParser.json());
app.use("/api/v1", api);
app.use(cors(corsOptions));

app.listen("4001", () => {
    console.log('Listening on '+4001);
});