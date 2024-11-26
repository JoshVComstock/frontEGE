import React from "react";
import styled from "styled-components";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  UserCircle,
  GraduationCap,
  LogOut,
  Baby,
  ClipboardList,
  BookOpen,
} from "lucide-react";

const Nav = () => {
  const userRole = "secretaria";
  const location = useLocation();

  const getNavLinks = (role) => {
    switch (role) {
      case "secretaria":
        return [
          { to: "/inicio", icon: <Home size={24} />, text: "Inicio" },
          { to: "/alumno", icon: <Baby size={24} />, text: "Niños" },
          { to: "/padres", icon: <Users size={24} />, text: "Padres" },
          {
            to: "/padres-hijos",
            icon: <UserCircle size={24} />,
            text: "Padres e Hijos",
          },
          {
            to: "/profesores",
            icon: <GraduationCap size={24} />,
            text: "Profesores",
          },
        ];
      case "padre":
        return [
          { to: "/inicio-padre", icon: <Home size={24} />, text: "Inicio" },
          {
            to: "/perfil-padre",
            icon: <UserCircle size={24} />,
            text: "Mi Perfil",
          },
        ];
      case "docente":
        return [
          { to: "/inicio-docente", icon: <Home size={24} />, text: "Inicio" },
          {
            to: "/lista-alumnos",
            icon: <ClipboardList size={24} />,
            text: "Lista Alumnos",
          },
          {
            to: "/observacion",
            icon: <BookOpen size={24} />,
            text: "Observaciones",
          },
        ];
      default:
        return [];
    }
  };

  return (
    <NavContainer>
      <Sidebar>
        <SidebarContent>
          <LogoContainer>
            {/*  <IconCircle>
              <GraduationCap size={32} />
            </IconCircle> */}
            <SchoolName>Mi Pequeño Mundo</SchoolName>
          </LogoContainer>

          <ButtonsContainer>
            {getNavLinks(userRole).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                $isActive={location.pathname === link.to}
              >
                {link.icon}
                <span>{link.text}</span>
              </NavLink>
            ))}

            <NavLinkLogout to="/">
              <LogOut size={24} />
              <span>Salir</span>
            </NavLinkLogout>
          </ButtonsContainer>
        </SidebarContent>
      </Sidebar>

      <MainContent>
        <Outlet />
      </MainContent>
    </NavContainer>
  );
};

export default Nav;

const NavContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background: #ffff;
`;

const Sidebar = styled.nav`
  width: 280px;
  background: linear-gradient(135deg, #e9c46a 0%, #ee964b 100%);
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  border-radius: 0 25px 25px 0;
`;

const SidebarContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const IconCircle = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  svg {
    color: #f95738;
  }
`;

const SchoolName = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  font-family: "Comic Sans MS", cursive;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 15px;
  background: ${(props) => (props.$isActive ? "#fff" : "transparent")};
  color: ${(props) => (props.$isActive ? "#f95738" : "#fff")};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: "Comic Sans MS", cursive;

  &:hover {
    background: ${(props) =>
      props.$isActive ? "#fff" : "rgba(255,255,255,0.2)"};
    transform: translateX(5px);
  }

  svg {
    margin-right: 1rem;
    stroke-width: 2px;
  }

  span {
    font-size: 1rem;
  }
`;

const NavLinkLogout = styled(NavLink)`
  margin-top: auto;

  color: white;
  &:hover {
    background: ${(props) =>
      props.$isActive ? "#fff" : "rgba(255,255,255,0.2)"};
    transform: translateX(5px);
  }
`;

const MainContent = styled.main`
  margin-left: 280px;
  width: calc(100% - 280px);
  height: 100%;
  overflow-y: auto;
  background: #ffff;
`;
