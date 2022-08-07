import {Router} from "express";
import { getRanking } from "../controllesrs/rankingControllers.js";

const route = Router();

route.get("/ranking",getRanking);

export default route;