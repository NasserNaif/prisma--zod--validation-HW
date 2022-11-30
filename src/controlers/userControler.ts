import { Users } from "@prisma/client";
import { Response, Request } from "express";
import { prisma } from "../config/DB";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

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

export const registerUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as Users;
    const hashPassword = await argon2.hash(newUser.password);
    newUser.password = hashPassword;
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

export const logInUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as Users;

    const isValidUsername = await prisma.users.findFirst({
      where: { username },
    });

    if (!isValidUsername) {
      return res.status(400).json({
        message: "wrong username OR password ",
      });
    }


    const isValidPassword = await argon2.verify(
      isValidUsername.password,
      password
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "wrong username OR password ",
      });
    }

    const token = jwt.sign(
      { id: isValidUsername.id, username: isValidUsername.username },
      process.env.JWT_SECRET as string
    );
    return res.status(200).json({
      message: "Welcome Back ",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mrssage: "server Error !",
    });
  }
};
