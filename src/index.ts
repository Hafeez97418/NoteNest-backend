import express from "express";
import UsersRouter from "./routes/user.routes";
import { ErrorMiddleWare } from "./middleware/Error";
import * as dotEnv from "dotenv";
import ConnectDatabase from "./vendors/db";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";

dotEnv.config();

const app = express();
const PORT = 3000;
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", UsersRouter);
app.use("/api/v1", authRouter);
app.use(ErrorMiddleWare);

ConnectDatabase();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
