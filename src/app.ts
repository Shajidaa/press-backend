import cookieParser from "cookie-parser";
import cors from "cors";
import Express, { Application } from "express";

import { userRouter } from "./modules/user/user.route";
import { authRouter } from "./modules/auth/auth.route";
import { postRouter } from "./modules/post/post.route";
import { commentRouter } from "./modules/comments/comment.route";
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
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
export default app;
