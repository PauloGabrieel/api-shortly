import { Router } from "express";

import tokenAuthentication from "../middlewares/tokenAuthentication.js";
import { userUrls } from "../controllesrs/userControllers.js";

const route = Router();

route.get("/users/me", tokenAuthentication,userUrls);

export default route;