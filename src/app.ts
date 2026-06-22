import cookieParser from "cookie-parser";
import cors from "cors";
import Express, { Application } from "express";

const app: Application = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
export default app;
