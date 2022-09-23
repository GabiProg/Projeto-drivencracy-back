import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import creationRoute from "./routes/creationRoute.js"
import choiceRoute from "./routes/choiceRoute.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(creationRoute);
app.use(choiceRoute);

app.listen(PORT, () => console.log(`The server is listening on ${PORT}`));