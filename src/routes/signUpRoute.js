import { Router } from "express";
import { createUser } from "../controllesrs/signUpControllers.js";
const route = Router();

route.post("/signup", createUser);

export default route;