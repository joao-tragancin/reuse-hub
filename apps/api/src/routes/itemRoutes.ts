import { Router } from "express";
import { prisma } from "../lib/prisma";
import { itemSchema, statusSchema } from "../schemas/itemSchema";

export const itemRoutes = Router();

itemRoutes.get("/", async (request, response, next) => {
  try {
    const search = String(request.query.search ?? "").trim();
    const category = String(request.query.category ?? "").trim();
    const status = String(request.query.status ?? "").trim();

    const items = await prisma.item.findMany({
      where: {
        ...(search && {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
            { city: { contains: search } },
          ],
        }),
        ...(category && category !== "Todas" && { category }),
        ...(status && status !== "TODOS" && { status }),
      },
      orderBy: { createdAt: "desc" },
    });

    response.json(items);
  } catch (error) {
    next(error);
  }
});

itemRoutes.get("/:id", async (request, response, next) => {
  try {
    const item = await prisma.item.findUnique({
      where: { id: Number(request.params.id) },
    });

    if (!item) {
      response.status(404).json({ message: "Item não encontrado." });
      return;
    }

    response.json(item);
  } catch (error) {
    next(error);
  }
});

itemRoutes.post("/", async (request, response, next) => {
  try {
    const data = itemSchema.parse(request.body);
    const item = await prisma.item.create({ data });
    response.status(201).json(item);
  } catch (error) {
    next(error);
  }
});

itemRoutes.put("/:id", async (request, response, next) => {
  try {
    const id = Number(request.params.id);
    const existingItem = await prisma.item.findUnique({ where: { id } });

    if (!existingItem) {
      response.status(404).json({ message: "Item não encontrado." });
      return;
    }

    const data = itemSchema.parse(request.body);
    const item = await prisma.item.update({ where: { id }, data });
    response.json(item);
  } catch (error) {
    next(error);
  }
});

itemRoutes.patch("/:id/status", async (request, response, next) => {
  try {
    const id = Number(request.params.id);
    const data = statusSchema.parse(request.body);
    const item = await prisma.item.update({ where: { id }, data });
    response.json(item);
  } catch (error) {
    next(error);
  }
});

itemRoutes.delete("/:id", async (request, response, next) => {
  try {
    const id = Number(request.params.id);
    const existingItem = await prisma.item.findUnique({ where: { id } });

    if (!existingItem) {
      response.status(404).json({ message: "Item não encontrado." });
      return;
    }

    await prisma.item.delete({ where: { id } });
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});
