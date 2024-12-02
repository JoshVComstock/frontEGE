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
  FormGroupColumns,
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
import { niñosData } from "../../../data/niños";
const ListaAlumno = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [idPadre, setIdPadre] = useState();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    certificado: false,
    ci: "",
    fechaNaci: "",
    IdPadre: idPadre,
  });
  const { data } = useGet("alumno");
  const { data: PadreData } = useGet("padre");
  const { postData } = usePost("alumno");
  const { updateData } = useUpdate("alumno");
  const { deleteData } = useDelete("alumno");

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);
  useEffect(() => {
    if (currentItem) {
      setForm({
        nombre: currentItem.nombre,
        apellido: currentItem.apellido,
        certificado: currentItem.certificado,
        ci: currentItem.ci,
        fechaNaci: currentItem.fechaNaci,
        IdPadre: currentItem.idPadre,
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
          "Certificado",
          "Carnet",
          "Fecha de nacimimiento",
          "Padre",
        ],
      ],
      body: items.map((item) => [
        item.id,
        item.nombre,
        item.apellido,
        item.certificado ? "Tiene" : "No tiene",
        item.ci,
        item.fechaNaci,
        item.padre,
      ]),
    });
    doc.save("alumno.pdf");
  };
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Alumno");
    XLSX.writeFile(wb, "alumno.xlsx");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentItem) {
      await updateData(currentItem.id, form);
    } else {
      console.log(form);
      await postData(form);
    }
    setIsModalOpen(false);
    setCurrentItem(null);
    setForm({
      nombre: "",
      apellido: "",
      certificado: false,
      ci: "",
      fechaNaci: "",
      IdPadre: idPadre,
    });
  };
  const handleDelete = async (id) => {
    await deleteData(id);
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
              placeholder="Buscar alumno..."
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
              <Th>Certificado</Th>
              <Th>Carnet</Th>
              <Th>Fecha de nacimiento</Th>
              <Th>Padre</Th>
              <Th>Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {niñosData?.map((item) => (
              <tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.nombre}</Td>
                <Td>{item.apellido}</Td>
                <Td>{item.certificado}</Td>
                <Td>{item.carnet}</Td>
                <Td>{item.fechaNacimiento}</Td>
                <Td>{item.padre}</Td>

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
              <h2>{currentItem ? "Editar alumno" : "Nuevo alumno"}</h2>
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
            <FormGroup>
              <Label>Padre</Label>
              <InputSelect
                name="IdPadre"
                onChange={handleChange}
                value={form.IdPadre}
                required
              >
                <option>Seleccionar padre</option>
                {PadreData?.data?.map((v, i) => (
                  <option value={v.id} key={i}>
                    {v.nombre}
                  </option>
                ))}
              </InputSelect>
            </FormGroup>
            <FormGroup>
              <Label>Certificado</Label>
              <Input
                type="checkbox"
                name="certificado"
                value={form.certificado}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Carnet</Label>
              <Input
                type="text"
                name="ci"
                value={form.ci}
                onChange={handleChange}
                placeholder="Carnet"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Fecha de nacimiento</Label>
              <Input
                type="date"
                name="fechaNaci"
                value={form.fechaNaci}
                onChange={handleChange}
                placeholder="Fecha de nacimiento"
                required
              />
            </FormGroup>
            <ButtonGroup>
              <Button type="submit" variant="primary">
                Guardar
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  setCurrentItem(null);
                }}
              >
                Cancelar
              </Button>
            </ButtonGroup>
          </form>
        </ModalContent>
      </ModalOverlay>
    </PageContainer>
  );
};

export default ListaAlumno;
