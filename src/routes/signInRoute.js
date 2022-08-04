import { Router } from "express";

import loginUser from "../controllesrs/signInControllers.js";
import { validateUser } from "../middlewares/signInValidator.js";

const route = Router();

route.post("/signin",validateUser,loginUser);

export default route;