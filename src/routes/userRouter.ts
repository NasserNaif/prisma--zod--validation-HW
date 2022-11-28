import express from "express";
import { getUsers, postNewUser } from "../controlers/userControler";
import validate from "../middleware/validate";
import { addUserSchema } from "../zodSchema/zodSchema";

const userRouter = express.Router();

userRouter.get(`/`, getUsers);
userRouter.post(`/`, validate(addUserSchema), postNewUser);

export default userRouter;
