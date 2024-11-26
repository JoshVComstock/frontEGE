import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();

app.get("/alumno", async (req, res) => {
  try {
    const alumno = await prisma.alumno.findMany({});
    res.json({
      data: alumno,
      message: "alumnos obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener alumno",
      error: error.message,
    });
  }
});

app.post("/alumno", async (req, res) => {
  try {
    const alumno = await prisma.alumno.create({
      data: req.body,
    });
    res.json({
      data: alumno,
      message: "alumno creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar alumno",
      error: error.message,
    });
  }
});
app.put("/alumno/:id", async (req, res) => {
  try {
    const alumno = await prisma.alumno.update({
      where: {
        ci: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: alumno,
      message: "alumno actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar alumno",
      error: error.message,
    });
  }
});
app.delete("/alumno/:id", async (req, res) => {
  try {
    const alumno = await prisma.alumno.delete({
      where: {
        ci: Number(req.params.id),
      },
    });
    res.json({
      data: alumno,
      message: "alumno eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar alumno",
      error: error.message,
    });
  }
});
app.get("/alumno/:id", async (req, res) => {
  try {
    const alumno = await prisma.alumno.findUnique({
      where: {
        ci: Number(req.params.id),
      },
    });
    res.json({
      data: alumno,
      message: "alumno obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener alumno",
      error: error.message,
    });
  }
});

export default app;
