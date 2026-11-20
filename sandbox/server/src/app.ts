import express, { Request, Response } from "express";
import morgan from "morgan";
import { createPod } from "./kubernetes/pod.js";
import { createService } from "./kubernetes/service.js";
import { v7 as uuid } from "uuid";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  ["/api/health", "/api/sandbox/health"],
  (req: Request, res: Response) => {
    res.status(200).json({ message: "sandbox is running", status: "ok" });
  },
);

app.post("/api/sandbox/start", async (req: Request, res: Response) => {
  const sandboxId = uuid();

  await Promise.all([createPod(sandboxId), createService(sandboxId)]);

  return res.status(201).json({
    message: "sandbox environment created successfully",
    sandboxId,
    previewUrl: `http://${sandboxId}.preview.localhost`,
  });
});

export default app;
