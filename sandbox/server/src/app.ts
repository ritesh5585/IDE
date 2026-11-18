import express, { Request, Response } from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(["/api/health", "/api/sandbox/health"], (req: Request, res: Response) => {
  res.status(200).json({ message: "sandbox is running", status: "ok" });
});

export default app;