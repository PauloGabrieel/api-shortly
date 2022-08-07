import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import signUpRoute from "./routes/signUpRoute.js";
import signInRoute from "./routes/signInRoute.js";
import urlsRoute from "./routes/urlsRoute.js";
import usersRoute from "./routes/usersRoute.js";
import rankingRoute from "./routes/rankingRoute.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(signUpRoute);
app.use(signInRoute);
app.use(urlsRoute);
app.use(usersRoute);
app.use(rankingRoute);

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("Server running");
})