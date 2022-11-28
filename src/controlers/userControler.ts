import { Users } from "@prisma/client";
import { Response, Request } from "express";
import { prisma } from "../config/DB";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const getUsers = await prisma.users.findMany();
    return res.status(200).json(getUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mrssage: "server Error !",
    });
  }
};

export const postNewUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as Users;

    await prisma.users.create({
      data: newUser,
    });
    return res.status(200).json({
      message: "user added !",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mrssage: "server Error !",
    });
  }
};
