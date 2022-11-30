import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

interface IUser {
  id: string;
  username: string;
  iat: number;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const hedear = req.headers.authorization;
    if (!hedear) {
      return res.status(401).json({
        message: "you are not allowed to access in this page !",
      });
    }

    const token = hedear.split(` `)[1];
    const user = jwt.verify(token, process.env.JWT_SECRET as string);

    res.locals.user = user;

    next();
  } catch (ee) {
    return res.status(402).json({
      message: "you are not allowed to access in this route !!!",
    });
  }
};

export const authorize =
  //   (...username: string[]) =>
  (username: string) => (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user.username as string;

    if (!username.includes(user)) {
      return res.status(401).json({
        message: "you are not allow to be here !",
      });
    }

    next();
  };
