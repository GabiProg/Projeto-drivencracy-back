import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import creationRoute from "./routes/creationRoute.js";
import choiceRoute from "./routes/choiceRoute.js";
import resultRoute from "./routes/resultRoute.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(creationRoute);
app.use(choiceRoute);
app.use(resultRoute);

app.listen(PORT, () => console.log(`The server is listening on ${PORT}.`));