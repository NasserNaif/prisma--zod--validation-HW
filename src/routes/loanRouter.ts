import express from "express";
import {
  addNewLoan,
  getAllLoan,
  lendBooks,
} from "../controlers/loanControler'";
import validate from "../middleware/validate";
import { addLoanSchema } from "../zodSchema/zodSchema";

const loanRouter = express.Router();

loanRouter.get(`/`, getAllLoan);
loanRouter.get(`/user/loan/:userid`, lendBooks);
loanRouter.post(`/`, validate(addLoanSchema), addNewLoan);

export default loanRouter;
