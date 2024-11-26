import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/alumnoCurso", async (req, res) => {
  try {
    const alumnoCurso = await prisma.alumnoCurso.findMany({});
    res.json({
      data: alumnoCurso,
      message: "alumnoCursos obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener alumnoCurso",
      error: error.message,
    });
  }
});

app.post("/alumnoCurso", async (req, res) => {
  try {
    const alumnoCurso = await prisma.alumnoCurso.create({
      data: req.body,
    });
    res.json({
      data: alumnoCurso,
      message: "alumnoCurso creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar alumnoCurso",
      error: error.message,
    });
  }
});
app.put("/alumnoCurso/:id", async (req, res) => {
  try {
    const alumnoCurso = await prisma.alumnoCurso.update({
      where: {
        ci: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: alumnoCurso,
      message: "alumnoCurso actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar alumnoCurso",
      error: error.message,
    });
  }
});
app.delete("/alumnoCurso/:id", async (req, res) => {
  try {
    const alumnoCurso = await prisma.alumnoCurso.delete({
      where: {
        ci: Number(req.params.id),
      },
    });
    res.json({
      data: alumnoCurso,
      message: "alumnoCurso eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar alumnoCurso",
      error: error.message,
    });
  }
});
app.get("/alumnoCurso/:id", async (req, res) => {
  try {
    const alumnoCurso = await prisma.alumnoCurso.findUnique({
      where: {
        ci: Number(req.params.id),
      },
    });
    res.json({
      data: alumnoCurso,
      message: "alumnoCurso obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener alumnoCurso",
      error: error.message,
    });
  }
});

export default app;
