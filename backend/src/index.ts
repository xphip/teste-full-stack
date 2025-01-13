import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { SERVER_PORT, SERVER_URL } from "./config";
import rootRoutes from "./routes";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(rootRoutes);

app.listen(SERVER_PORT, () => {
  console.log(`Servidor rodando em ${SERVER_URL}:${SERVER_PORT}`);
});
