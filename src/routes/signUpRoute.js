import { Router } from "express";

const route = Router();

route.post("/signup", createUser);

export default route;