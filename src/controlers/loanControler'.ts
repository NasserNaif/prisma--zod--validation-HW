import { Loans } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../config/DB";

// get all laons
export const getAllLoan = async (req: Request, res: Response) => {
  try {
    const allLoans = await prisma.loans.findMany();
    return res.status(200).json(allLoans);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "server error !",
    });
  }
};

// create laon in the body
export const addNewLoan = async (req: Request, res: Response) => {
  try {
    const newLoan = req.body as Loans;
    await prisma.loans.create({ data: newLoan });

    return res.status(201).json({
      message: "laon added",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "server error !",
    });
  }
};

// return the lended books by user ID
export const lendBooks = async (req: Request, res: Response) => {
  try {
    const userId = req.params;

    const getUserBooks = await prisma.books.findMany({
      select: {
        loan: {
          select: {
            userId: true,
          },
        },
      },
    });

    return res.status(200).json(getUserBooks);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "server error !",
    });
  }
};
