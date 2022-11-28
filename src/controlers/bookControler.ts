import { Books } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../config/DB";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const getBooks = await prisma.books.findMany();
    return res.status(200).json(getBooks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mrssage: "server Error !",
    });
  }
};

export const addNewBook = async (req: Request, res: Response) => {
  try {
    const newBook = req.body as Books;
    await prisma.books.create({ data: newBook });

    return res.status(201).json({
      message: "book added !",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      mrssage: "server Error !",
    });
  }
};
