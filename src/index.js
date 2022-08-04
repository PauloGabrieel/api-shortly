import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import signUpRoute from "./routes/signUpRoute.js";
import signInRoute from "./routes/signInRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(signUpRoute);
app.use(signInRoute);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("Server running");
})