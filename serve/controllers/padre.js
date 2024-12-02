import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/padre", async (req, res) => {
  try {
    const padre = await prisma.padre.findMany({});
    res.json({
      data: padre,
      message: "padres obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener padre",
      error: error.message,
    });
  }
});

app.post("/padre", async (req, res) => {
  try {
    const padre = await prisma.padre.create({
      data: req.body,
    });
    res.json({
      data: padre,
      message: "padre creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar padre",
      error: error.message,
    });
  }
});
app.put("/padre/:id", async (req, res) => {
  try {
    const padre = await prisma.padre.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: padre,
      message: "padre actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar padre",
      error: error.message,
    });
  }
});
app.delete("/padre/:id", async (req, res) => {
  try {
    const padre = await prisma.padre.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      data: padre,
      message: "padre eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar padre",
      error: error.message,
    });
  }
});
app.get("/padre/:id", async (req, res) => {
  try {
    const padre = await prisma.padre.findUnique({
      where: {
        ci: Number(req.params.id),
      },
    });
    res.json({
      data: padre,
      message: "padre obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener padre",
      error: error.message,
    });
  }
});

export default app;
