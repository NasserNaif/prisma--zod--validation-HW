import { Loans } from "@prisma/client";
import { count } from "console";
import { Request, Response } from "express";
import { prisma } from "../config/DB";
import { paramsType } from "../zodSchema/zodSchema";

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
    const {userid} = req.params as paramsType;

    const getUserBooks = await prisma.users.findUnique({
      //   select: {
      //     loan: {
      //       select: {
      //         userId: true,
      //       },
      //     },
      //   },
      where: {id:userid},
      select: {
        username: true,
        loan: true,
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
