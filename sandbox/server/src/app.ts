import express from "express";
import type { Request, Response } from "express";
import morgan from "morgan";
import { createPod } from "./kubernetes/pod.js";
import { createServcie } from "./kubernetes/service.js";
import { v7 as uuid } from "uuid";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/sandbox/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Sandbox is healthy",
    status: "OK",
  });
});

app.post("/api/sandbox/start", async (req: Request, res: Response) => {
  const sandboxId = uuid();

  try {
    await Promise.all([createPod(sandboxId), createServcie(sandboxId)]);

    res.status(200).json({
      message: "Sandbox created successfully",
      status: "OK",
      sandboxId: sandboxId,
    });
  } catch (error) {
    console.error("Error creating sandbox:", error);
    res.status(500).json({
      message: "Failed to create sandbox",
      status: "ERROR",
    });
  }
});

export default app;
