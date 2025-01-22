import express from "express";
import UsersRouter from "./routes/user.routes";
import { ErrorMiddleWare } from "./middleware/Error";
import * as dotEnv from "dotenv";
import ConnectDatabase from "./vendors/db";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import adminRouter from "./routes/admin.routes";
import themeRouter from "./routes/theme.routes";
import notesRouter from "./routes/notes.routes";
import cors, { CorsOptions } from "cors";
dotEnv.config();

var corsOptions:CorsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
  credentials: true,
};
const app = express();
const PORT = process.env.PORT;

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", UsersRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", themeRouter);
app.use("/api/v1", notesRouter);
app.use(ErrorMiddleWare);

ConnectDatabase();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
