import { Router } from "express";

import authentication from "../middlewares/tokenAuthentication.js";
import { validateUrl } from "../middlewares/urlsValidator.js";
import { shortenUrl,getShortUrlById } from "../controllesrs/urlsControllers.js";
const route = Router();

route.post("/urls/shorten",authentication,validateUrl,shortenUrl);
route.get("/urls/:id",getShortUrlById);

export default route;