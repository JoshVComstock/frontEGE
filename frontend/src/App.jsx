import React from "react";
import Login from "./views/public/login";
import Nav from "./views/private/nav";
import Usuario from "./views/private/usuario/usuario";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/* import Usuario from "./views/private/usuario/usuario";
import Producto from "./views/private/p"
import Compra from "./views/compra";
import Almacen from "./views/almacen"; */
import { Toaster } from "react-hot-toast";
import Alumno from "./views/private/niños";
import Padre from "./views/private/padres";
import PadreHijo from "./views/private/padreHijo";
import Inicio from "./views/private/inicio/inicio";
import Profesores from "./views/private/profesores";
import { UserProvider } from "./context/useContext";
import InicioPadre from "./views/private/inicioPadre";
import InicioDocente from "./views/private/inicioDocente";
import ListaAlumno from "./views/private/listaAlumno";
import Observacion from "./views/private/observaciones";
import PerfilPadre from "./views/private/perfilPadre";
function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/" element={<Nav />}>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/usuarios" element={<Usuario />} />
            <Route path="/alumno" element={<Alumno />} />
            <Route path="/padres" element={<Padre />} />
            <Route path="/padres-hijos" element={<PadreHijo />} />
            <Route path="/profesores" element={<Profesores />} />
            <Route path="/lista-alumnos" element={<ListaAlumno />} />
            <Route path="/observacion" element={<Observacion />} />
            <Route path="/perfil-padre" element={<PerfilPadre />} />

            <Route path="/inicio-padre" element={<InicioPadre />} />
            <Route path="/inicio-docente" element={<InicioDocente />} />
            {/* <Route path="/productos" element={<Producto />} />
          <Route path="/compras" element={<Compra />} />
          <Route path="/almacen" element={<Almacen />} />
        */}
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
