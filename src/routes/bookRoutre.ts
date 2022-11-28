import express from "express";
import { addNewBook, getAllBooks } from "../controlers/bookControler";
import validate from "../middleware/validate";
import { addBooksSchema } from "../zodSchema/zodSchema";

const bookRouter = express.Router();

bookRouter.get(`/`, getAllBooks);
bookRouter.post(`/`, validate(addBooksSchema), addNewBook);

export default bookRouter;
