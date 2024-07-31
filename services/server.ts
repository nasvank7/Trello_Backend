import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import client from "./connection/db";
import userRoute from "./routes/userRouter";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
