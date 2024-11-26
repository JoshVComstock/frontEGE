import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Building, 
  MessageCircle, 
  Settings,
  ChevronRight,
  Bell,
  Search
} from 'lucide-react';

const COLORS = {
  PRIMARY: '#2c3e50',
  SECONDARY: '#34495e',
  BACKGROUND: '#f4f6f9',
  TEXT_DARK: '#333',
  ACCENT: '#e39774'
};

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${COLORS.BACKGROUND};
  font-family: 'Inter', sans-serif;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: ${COLORS.PRIMARY};
  color: white;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
`;

const SidebarLogo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const SidebarMenu = styled.div`
  flex-grow: 1;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  gap: 1rem;
  color: ${props => props.active ? 'white' : '#a0a0a0'};
  background-color: ${props => props.active ? COLORS.SECONDARY : 'transparent'};

  &:hover {
    background-color: ${COLORS.SECONDARY};
    color: white;
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${COLORS.BACKGROUND};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  width: 250px;
  outline: none;
`;

const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DashboardContent = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
  color: ${COLORS.ACCENT};
`;

const StatValue = styled.h2`
  font-size: 2rem;
  color: ${COLORS.PRIMARY};
  margin: 0.5rem 0;
`;

const StatLabel = styled.p`
  color: #6c757d;
  margin: 0;
`;

const QuickActionSection = styled.div`
  grid-column: span 3;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
`;

const QuickActionCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const Inicio = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  return (
    <DashboardContainer>
      <MainContent>
        <TopBar>
          <SearchContainer>
            <Search size={18} />
            <SearchInput placeholder="Buscar..." />
          </SearchContainer>
          
          <TopBarActions>
            <Bell size={20} />
            <MessageCircle size={20} />
            <img 
              src="/api/placeholder/40/40" 
              alt="Admin" 
              style={{ 
                borderRadius: '50%', 
                width: '40px', 
                height: '40px' 
              }} 
            />
          </TopBarActions>
        </TopBar>

        <DashboardContent>
          <StatCard>
            <StatHeader>
              <StatIcon><Users size={30} /></StatIcon>
              <ChevronRight />
            </StatHeader>
            <StatValue>850</StatValue>
            <StatLabel>Total Estudiantes</StatLabel>
          </StatCard>

          <StatCard>
            <StatHeader>
              <StatIcon><GraduationCap size={30} /></StatIcon>
              <ChevronRight />
            </StatHeader>
            <StatValue>65</StatValue>
            <StatLabel>Total Profesores</StatLabel>
          </StatCard>

          <StatCard>
            <StatHeader>
              <StatIcon><Building size={30} /></StatIcon>
              <ChevronRight />
            </StatHeader>
            <StatValue>12</StatValue>
            <StatLabel>Años de Fundación</StatLabel>
          </StatCard>

          <QuickActionSection>
            <QuickActionCard>
              <h3>Últimas Inscripciones</h3>
            </QuickActionCard>
            <QuickActionCard>
              <h3>Próximos Eventos</h3>
            </QuickActionCard>
          </QuickActionSection>
        </DashboardContent>
      </MainContent>
    </DashboardContainer>
  );
};

export default Inicio;