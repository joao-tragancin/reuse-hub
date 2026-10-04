import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { itemRoutes } from "./routes/itemRoutes";

const app = express();
const port = Number(process.env.PORT ?? 3333);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") ?? "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ status: "ok", project: "ReUse Hub" });
});

app.use("/items", itemRoutes);

app.use(
  (error: unknown, _request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof ZodError) {
      response.status(400).json({
        message: "Verifique os dados informados.",
        errors: error.issues,
      });
      return;
    }

    console.error(error);
    response.status(500).json({ message: "Ocorreu um erro no servidor." });
  },
);

app.listen(port, () => {
  console.log(`API do ReUse Hub executando na porta ${port}.`);
});
