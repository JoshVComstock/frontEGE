import express from "express";
import cors from "cors";
import alumno from "./controllers/alumno.js";
import curso from "./controllers/curso.js";
import alumnoCurso from "./controllers/alumnoCurso.js";
import padre from "./controllers/padre.js";
import usuario from "./controllers/usuario.js";

const app = express();
const port = 3000;
import bodyParser from "body-parser";
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(cors());
app.use(alumno);
app.use(curso);
app.use(alumnoCurso);
app.use(padre);
app.use(usuario);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
