import { Router } from "express";

import tokenAuthentication from "../middlewares/tokenAuthentication.js";
import { validateUrl } from "../middlewares/urlsValidator.js";
import { shortenUrl,getShortUrlById, redirectUrl,deleteUrl } from "../controllesrs/urlsControllers.js";
const route = Router();

route.post("/urls/shorten",tokenAuthentication,validateUrl,shortenUrl);
route.get("/urls/:id",getShortUrlById);
route.get("/urls/open/:shortUrl",redirectUrl);
route.delete("/urls/:id",tokenAuthentication,deleteUrl);

export default route;