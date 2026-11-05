import express from "express";
import type { Request, Response } from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/sandbox/health", (req: Request, res: Response) => {
  res.status(200).json({ 
    message: "Sandbox is healthy",
     status: "OK"
     });
});

export default app;
