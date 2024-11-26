import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();
import { v4 } from "uuid";

app.get("/curso", async (req, res) => {
  try {
    const curso = await prisma.curso.findMany({});
    res.json({
      data: curso,
      message: "cursos obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener curso",
      error: error.message,
    });
  }
});

app.post("/curso", async (req, res) => {
  try {
    const curso = await prisma.curso.create({
      data: req.body,
    });
    res.json({
      data: curso,
      message: "curso creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar alumno",
      error: error.message,
    });
  }
});

app.put("/curso/:id", async (req, res) => {
  try {
    const curso = await prisma.curso.update({
      where: {
        ci: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: curso,
      message: "curso actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar curso",
      error: error.message,
    });
  }
});
app.delete("/curso/:id", async (req, res) => {
  try {
    const curso = await prisma.curso.delete({
      where: {
        ci: Number(req.params.id),
      },
    });
    res.json({
      data: curso,
      message: "curso eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar curso",
      error: error.message,
    });
  }
});
app.get("/curso/:id", async (req, res) => {
  try {
    const curso = await prisma.curso.findUnique({
      where: {
        ci: Number(req.params.id),
      },
    });
    res.json({
      data: curso,
      message: "curso obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener curso",
      error: error.message,
    });
  }
});

export default app;
