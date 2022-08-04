import { Router } from "express";

import authentication from "../middlewares/tokenAuthentication.js";
import { validateUrl } from "../middlewares/urlsValidator.js";
import { shortenUrl } from "../controllesrs/urlsControllers.js";
const route = Router();

route.post("/urls/shorten",authentication,validateUrl,shortenUrl);

export default route;