import React, { useState } from "react";
import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapPin,
  User,
  BookOpen,
  Phone,
  Mail,
  Briefcase,
  Star,
  Award,
  Globe,
  X,
} from "lucide-react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const PerfilPadre = () => {
  const [selectedChild, setSelectedChild] = useState(null);

  const padre = {
    name: "Juan Pérez",
    description: "Padre de familia comprometido",
    avatar:
      "https://img.lovepik.com/free-png/20210922/lovepik-hand-drawn-cartoon-fathers-day-moustache-dad-image-png-image_401120299_wh1200.png",
  };

  const children = [
    {
      name: "Mario Pérez",
      location: [-17.380927, -66.152009],
      details: "Estudiante de 1 de primaria",
      age: 22,
      phone: "+1 (555) 123-4567",
      email: "maria.perez@example.com",
      university: "Colegio jesus",
      interests: ["Matematicas", "Divertido"],
      achievements: ["Mejor Promedio 2024", ""],
      avatar:
        "https://media.istockphoto.com/id/1399611777/es/foto/retrato-de-un-ni%C3%B1o-sonriente-de-pelo-casta%C3%B1o-mirando-a-la-c%C3%A1mara-ni%C3%B1o-feliz-con-buenos-dientes.jpg?s=612x612&w=0&k=20&c=OZZF4QU3PJvEuDHB8Q4ttDKuUhjtJax-GeZZQJFrOXo=",
    },
    {
      name: "Carlos Pérez",
      location: [-17.377924, -66.159376],
      details: "Estudiante de 3 de primaria",
      age: 20,
      phone: "+1 (555) 987-6543",
      email: "carlos.perez@example.com",
      university: "Colegio jesus",
      interests: ["Lenguaje", "Divertido"],
      achievements: ["Correr", ""],
      avatar:
        "https://www.cdc.gov/ncbddd/spanish/childdevelopment/positiveparenting/images/preschool-400px.jpg?_=22364",
    },
    {
      name: "Laura Pérez",
      location: [-17.378642, -66.161101],
      details: "Estudiante de 2 de primaria",
      age: 24,
      phone: "+1 (555) 246-8101",
      email: "laura.perez@example.com",
      university: "Colegio jesus",
      interests: ["Sociales", "Divertido"],
      achievements: ["Jugador", "Debate Nacional"],
      avatar:
        "https://www.cdc.gov/ncbddd/childdevelopment/positiveparenting/images/toddler-girl-pig-tails-300px.jpg?_=24420",
    },
  ];

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <ProfileAvatar src={padre.avatar} alt={padre.name} />
          <HeaderText>
            <h1>{padre.name}</h1>
            <p>{padre.description}</p>
          </HeaderText>
        </HeaderContent>
      </Header>

      <ChildrenGrid>
        {children.map((child, index) => (
          <ChildCard key={index} onClick={() => setSelectedChild(child)}>
            <ChildAvatar src={child.avatar} alt={child.name} />
            <ChildInfo>
              <h2>{child.name}</h2>
              <p>{child.details}</p>
            </ChildInfo>
          </ChildCard>
        ))}
      </ChildrenGrid>

      {selectedChild && (
        <Modal>
          <ModalContent>
            <ModalCloseButton onClick={() => setSelectedChild(null)}>
              <X size={30} />
            </ModalCloseButton>
            <MapWrapper>
              <MapContainer
                center={selectedChild.location}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={selectedChild.location}>
                  <Popup>{selectedChild.name}</Popup>
                </Marker>
              </MapContainer>
            </MapWrapper>
            <DetailSection>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                <img
                  src={selectedChild.avatar}
                  alt={selectedChild.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginRight: "1rem",
                    border: "4px solid #FF5722",
                  }}
                />
                <div>
                  <h2 style={{ color: "#FF5722", fontSize: "1.5rem" }}>
                    {selectedChild.name}
                  </h2>
                  <p style={{ color: "#FF9800" }}>{selectedChild.details}</p>
                </div>
              </div>

              <DetailRow>
                <User />
                <span>Edad: {selectedChild.age} años</span>
              </DetailRow>
              <DetailRow>
                <Globe />
                <span>Universidad: {selectedChild.university}</span>
              </DetailRow>
              <DetailRow>
                <Phone />
                <span>Teléfono: {selectedChild.phone}</span>
              </DetailRow>
              <DetailRow>
                <Mail />
                <span>Correo: {selectedChild.email}</span>
              </DetailRow>
              <DetailRow>
                <Briefcase />
                <span>Intereses: {selectedChild.interests.join(", ")}</span>
              </DetailRow>
              <DetailRow>
                <Award />
                <span>Logros: {selectedChild.achievements.join(", ")}</span>
              </DetailRow>
            </DetailSection>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
};

export default PerfilPadre;

const PageContainer = styled.div`
  min-height: 100vh;
  font-family: "Arial", sans-serif;
`;

const Header = styled.header`
  color: #ff9800;
  padding: 2rem;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProfileAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  margin-right: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderText = styled.div`
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  p {
    font-size: 1rem;
  }
`;

const ChildrenGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChildCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const ChildAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 1rem;
  border: 3px solid #ff5722;
`;

const ChildInfo = styled.div`
  h2 {
    color: #ff5722;
    font-size: 1.3rem;
    margin-bottom: 0.3rem;
  }

  p {
    color: #ff9800;
    font-size: 0.9rem;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  width: 90%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 500px;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #ff5722;
  cursor: pointer;
  z-index: 10;
`;

const DetailSection = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #ff5722;

  svg {
    margin-right: 1rem;
    color: #ff9800;
  }
`;
