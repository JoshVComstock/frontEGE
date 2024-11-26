import express from "express";
import { PrismaClient } from "@prisma/client";
import yup from "yup";
import bcrypt from "bcrypt";
const app = express();
const prisma = new PrismaClient();

app.get("/usuario", async (req, res) => {
  try {
    const usuario = await prisma.usuario.findMany({});
    res.json({
      data: usuario,
      message: "usuarios obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuario",
      error: error.message,
    });
  }
});

app.post("/usuario", async (req, res) => {
  try {
    const { nombre, usuario, password, rol, telefono, direccion } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.usuario.create({
      data: {
        nombre,
        usuario,
        password: hashedPassword,
        rol,
        direccion,
        telefono,
      },
    });
    res.json({
      data: user,
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar usuario",
      error: error.message,
    });
  }
});
app.put("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.update({
      where: {
        ci: Number(req.params.id),
      },
      data: req.body,
    });
    res.json({
      data: usuario,
      message: "usuario actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar usuario",
      error: error.message,
    });
  }
});
app.delete("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.delete({
      where: {
        ci: Number(req.params.id),
      },
    });
    res.json({
      data: usuario,
      message: "usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar usuario",
      error: error.message,
    });
  }
});
app.get("/usuario/:id", async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        ci: Number(req.params.id),
      },
    });
    res.json({
      data: usuario,
      message: "usuario obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuario",
      error: error.message,
    });
  }
});
const loginSchema = yup.object().shape({
  usuario: yup.string().required("El usuario es obligatorio."),
  password: yup.string().required("La contraseña es obligatoria."),
});

app.post("/login", async (req, res) => {
  try {
    await loginSchema.validate(req.body);
    const { usuario, password } = req.body;

    const login = await prisma.usuario.findFirst({
      where: {
        usuario: usuario,
      },
    });

    if (!login) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, login.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Contraseña incorrecta",
      });
    }

    res.status(200).json({
      data: {
        id: login.id,
        nombre: login.nombre,
        usuario: login.usuario,
      },
      message: `Bienvenido ${login.nombre}`,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Datos de entrada inválidos",
        errors: error.errors,
      });
    }

    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
});

export default app;
