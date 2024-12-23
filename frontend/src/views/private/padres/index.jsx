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
  DeleteIcon,
  XOctagon,
  Edit3,
  XOctagonIcon,
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
  FormGroupColumns,
} from "../../../style/styleCrud";
import { useGet } from "../../../hook/useGet";
import { formatFecha } from "../../../utils/formatDate";
import { usePost } from "../../../hook/usePost";
import { useUpdate } from "../../../hook/usePut";
import { useDelete } from "../../../hook/useDelete";
import { UsuarioData } from "../../../data/padreHijo";
import { padreData } from "../../../data/padre";
const Padre = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    ci: "",
    telefono: "",
    direccion: "",
    gmail: "",
    password: "",
  });
  const { data, reload } = useGet("padre");
  const { postData } = usePost("padre");
  const { updateData } = useUpdate("padre");
  const { deleteData } = useDelete("padre");

  useEffect(() => {
    if (currentItem) {
      setForm({
        nombre: currentItem.nombre,
        apellido: currentItem.apellido,
        ci: currentItem.ci,
        telefono: currentItem.telefono,
        direccion: currentItem.direccion,
        gmail: currentItem.gmail,
        password: currentItem.password,
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
      head: [
        [
          "ID",
          "Nombre",
          "Apellido",
          "Carnet",
          "telefono",
          "Direccion",
          "Correo",
        ],
      ],
      body: items.map((item) => [
        item.id,
        item.nombre,
        item.apellido,
        item.ci,
        item.telefono,
        item.direccion,
        item.gmail,
      ]),
    });
    doc.save("padres.pdf");
  };
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Padres");
    XLSX.writeFile(wb, "padres.xlsx");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentItem) {
      await updateData(currentItem.id, form);
      reload();
    } else {
      await postData(form);
      reload();
    }
    setIsModalOpen(false);
    setCurrentItem(null);
    setForm({
      nombre: "",
      apellido: "",
      ci: "",
      telefono: "",
      direccion: "",
      gmail: "",
      password: "",
    });
  };
  const handleDelete = async (id) => {
    await deleteData(id);
    reload();
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
              placeholder="Buscar padre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <ButtonGroup>
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
              <Th>Apellido</Th>
              <Th>Carnet</Th>
              <Th>Telefono</Th>
              <Th>Direccion</Th>
              <Th>Correo</Th>
              <Th>Contraseña</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {padreData?.map((item, i) => (
              <tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{item.nombre}</Td>
                <Td>{item.apellido}</Td>
                <Td>{item.ci}</Td>
                <Td>{item.telefono}</Td>
                <Td>{item.direccion}</Td>
                <Td>{item.gmail}</Td>
                <Td>********</Td>
                <Td>
                  <ActionButtons>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setCurrentItem(item);
                        setIsModalOpen(true);
                      }}
                    >
                      <Edit3 size={16} />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      <XOctagonIcon size={16} />
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
              <h2>{currentItem ? "Editar padre" : "Nuevo padre"}</h2>
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

            <FormGroupColumns>
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
                <Label>Apellido</Label>
                <Input
                  type="text"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  placeholder="Apellido"
                  required
                />
              </FormGroup>
            </FormGroupColumns>
            <FormGroupColumns>
              <FormGroup>
                <Label>Carnet</Label>
                <Input
                  type="number"
                  name="ci"
                  value={form.ci}
                  onChange={handleChange}
                  placeholder="Carnet"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Telefono</Label>
                <Input
                  type="number"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="Telefono"
                  required
                />
              </FormGroup>
            </FormGroupColumns>
            <FormGroup>
              <Label>Direccion</Label>
              <Input
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                placeholder="Direccion"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Correo</Label>
              <Input
                type="text"
                name="gmail"
                value={form.gmail}
                onChange={handleChange}
                placeholder="Correo"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Contraseña</Label>
              <Input
                type="text"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Contraseña"
                required
              />
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

export default Padre;
