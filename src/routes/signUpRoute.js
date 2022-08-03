import { Router } from "express";
import { createUser } from "../controllesrs/signUpControllers.js";
import { validateUser } from "../middlewares/userValidator.js";
const route = Router();

route.post("/signup",validateUser, createUser);

export default route;