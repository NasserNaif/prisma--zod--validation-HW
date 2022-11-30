import express from "express";
import { getUsers, logInUser, registerUser } from "../controlers/userControler";
import { authorize, protect } from "../middleware/aouth";
import validate from "../middleware/validate";
import { addUserSchema } from "../zodSchema/zodSchema";

const userRouter = express.Router();

userRouter.get(`/`, protect, authorize("naif"), getUsers);
userRouter.post(`/rigester`, validate(addUserSchema), registerUser);
userRouter.post(`/login`, validate(addUserSchema), logInUser);

export default userRouter;
