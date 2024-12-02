import React, { useState, useEffect } from "react";
import {
  FilePen,
  FileSpreadsheet,
  Plus,
  Search,
  Edit2,
  Trash2,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  ActionButtons,
  Button,
  ButtonGroup,
  FormContainer,
  FormGroup,
  FormHeader,
  FormTitle,
  Input,
  InputSelect,
  Label,
  ModalContent,
  ModalOverlay,
  PageContainer,
  PaginationButton,
  PaginationContainer,
  SearchContainer,
  Table,
  TableContainer,
  TableHeader,
  Td,
  Th,
} from "../../../style/styleCrud";
import { useGet } from "../../../hook/useGet";
import { formatFecha } from "../../../utils/formatDate";
import { usePost } from "../../../hook/usePost";
import { useUpdate } from "../../../hook/usePut";
import { useDelete } from "../../../hook/useDelete";
import { profesoresData } from "../../../data/profesores";
const Profesores = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  function obtenerFechaActualISO() {
    return new Date().toISOString();
  }

  const fechaActual = obtenerFechaActualISO();
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    rol: "profesor",
    fecha_registro: fechaActual,
  });
  const { data } = useGet("usuario");
  const { postData } = usePost("usuario");
  const { updateData } = useUpdate("usuario");
  const { deleteData } = useDelete("usuario");

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);
  useEffect(() => {
    if (currentItem) {
      setForm({
        nombre: currentItem.nombre,
        correo: currentItem.correo,
        contraseña: currentItem.contraseña,
        rol: currentItem.rol,
        fecha_registro: currentItem.fecha_registro,
      });
    }
  }, [currentItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["ID", "Nombre", "Precio", "Stock"]],
      body: items.map((item) => [
        item.id,
        item.nombre,
        item.precio,
        item.stock,
      ]),
    });
    doc.save("productos.pdf");
  };
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Productos");
    XLSX.writeFile(wb, "productos.xlsx");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentItem) {
      const updatedUser = await updateData(currentItem.id, form);
      setItems(
        items.map((item) => (item.id === updatedUser.id ? updatedUser : item))
      );
    } else {
      const newUser = await postData(form);
      setItems([...items, newUser]);
    }
    setIsModalOpen(false);
    setCurrentItem(null);
    setForm({
      nombre: "",
      correo: "",
      contraseña: "",
      rol: "",
      fecha_registro: fechaActual,
    });
  };
  const handleDelete = async (id) => {
    await deleteData(id);
    setItems(items.filter((item) => item.id !== id));
  };
  const filteredItems = data?.data?.filter((item) =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredItems?.length / itemsPerPage);
  const paginatedItems = filteredItems?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <PageContainer>
      <TableContainer>
        <TableHeader>
          <SearchContainer>
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <ButtonGroup>
            <Button variant="secondary" onClick={exportToPDF}>
              <FilePen size={20} />
              PDF
            </Button>
            <Button variant="secondary" onClick={exportToExcel}>
              <FileSpreadsheet size={20} />
              Excel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              <Plus size={20} />
              Agregar
            </Button>
          </ButtonGroup>
        </TableHeader>

        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Nombre</Th>
              <Th>Usuario</Th>
              <Th>Telefono</Th>
              <Th>Direccion</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {profesoresData?.map((item) => (
              <tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.nombre}</Td>
                <Td>{item.usuario}</Td>
                <Th>{item.telefono}</Th>
                <Th>{item.direccion}</Th>

                <Td>
                  <ActionButtons>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setCurrentItem(item);
                        setIsFormOpen(true);
                      }}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </ActionButtons>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationContainer>
          <PaginationButton
            variant="secondary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </PaginationButton>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <PaginationButton
            variant="secondary"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </PaginationButton>
        </PaginationContainer>
      </TableContainer>

      <ModalOverlay isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleSubmit}>
            <ButtonGroup
              style={{
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <h2>{currentItem ? "Editar usuario" : "Nuevo usuario"}</h2>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentItem(null);
                }}
              >
                <X size={20} />
              </Button>
            </ButtonGroup>

            <FormGroup>
              <Label>Nombre</Label>
              <Input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Correo</Label>
              <Input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="Correo"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Contraseña</Label>
              <Input
                type="password"
                name="contraseña"
                value={form.contraseña}
                onChange={handleChange}
                placeholder="Contraseña"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Rol</Label>
              <InputSelect
                name="rol"
                onChange={handleChange}
                value={form.rol}
                required
              >
                <option value="">Seleccionar Rol</option>
                <option value="dueño">Dueño</option>
                <option value="chef">Chef</option>
                <option value="jefe de area">Jefe de área</option>
                <option value="cocinero">Cocinero</option>
              </InputSelect>
            </FormGroup>

            <ButtonGroup>
              <Button type="submit" variant="primary">
                <Save size={20} /> Guardar
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentItem(null);
                }}
              >
                <X size={20} /> Cancelar
              </Button>
            </ButtonGroup>
          </form>
        </ModalContent>
      </ModalOverlay>
    </PageContainer>
  );
};

export default Profesores;
