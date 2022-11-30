import express from "express";
import { connectDB } from "./config/DB";
import bookRouter from "./routes/bookRoutre";
import loanRouter from "./routes/loanRouter";
import userRouter from "./routes/userRouter";
import "dotenv/config";

const app = express();

connectDB();
app.use(express.json());

app.use(`/api/v1/user`, userRouter);
app.use(`/api/v1/book`, bookRouter);
app.use(`/api/v1/loan`, loanRouter);

const PORT = process.env.port || 5001;
app.listen(PORT, () => {
  console.log("server run on port : " + PORT);
});
