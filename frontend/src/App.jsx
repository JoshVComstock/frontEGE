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

function App() {
  return (
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
          {/* <Route path="/productos" element={<Producto />} />
          <Route path="/compras" element={<Compra />} />
          <Route path="/almacen" element={<Almacen />} />
        */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
