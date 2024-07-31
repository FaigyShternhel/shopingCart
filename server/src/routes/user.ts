import { Router } from "express";
import { addUser, login } from "../controllers/user";

const userRouter:Router = Router();

userRouter.post("/addUser", addUser);
userRouter.post("/login", login);

export default userRouter;
