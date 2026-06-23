import cookieParser from "cookie-parser";
import cors from "cors";
import Express, { Application, Request, Response } from "express";
import { prisma } from "./lib/prisma";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { userRouter } from "./modules/user/user.route";
const app: Application = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRouter);
export default app;
