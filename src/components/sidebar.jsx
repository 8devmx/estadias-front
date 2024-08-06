import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import axios from 'axios';

const SidebarContainer = styled.div`
  position: fixed;
  width: 250px;
  height: 100%;
  background-color: #2c3e50;
  color: white;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  z-index: 1000;

  @media(min-width: 768px) {
    transform: translateX(0);
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  background-color: #1a252f;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const SidebarMenu = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SidebarMenuItem = styled.li`
  padding: 10px 20px;
  text-align: center;

  a {
    color: white;
    text-decoration: none;
    font-size: 18px;
    display: block;

    &:hover {
      background-color: #1a252f;
    }
  }
`;

const SidebarToggle = styled.button`
  position: fixed;
  top: 15px;
  left: 15px;
  background-color: #2c3e50;
  color: white;
  border: none;
  font-size: 30px;
  cursor: pointer;
  z-index: 1100;

  @media(min-width: 768px) {
    display: none;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [candidateData, setCandidateData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/candidatesfront/${id}`);
        setCandidateData(response.data);
      } catch (error) {
        console.log (responde.data)
        console.error('Error fetching candidate data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!candidateData) {
    return <div>Loading...</div>;
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <img src={`../../${candidateData.foto_perfil}`}
            alt="Perfil" 
            style={{ borderRadius: '50%', width: '150px', margin: '20px auto' }} 
          />
        </SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem><a href="#about" onClick={toggleSidebar}>ABOUT</a></SidebarMenuItem>
          <SidebarMenuItem><a href="#experience" onClick={toggleSidebar}>EXPERIENCE</a></SidebarMenuItem>
          <SidebarMenuItem><a href="#education" onClick={toggleSidebar}>EDUCATION</a></SidebarMenuItem>
          <SidebarMenuItem><a href="#skills" onClick={toggleSidebar}>SKILLS</a></SidebarMenuItem>
          <SidebarMenuItem><a href="#interests" onClick={toggleSidebar}>INTERESTS</a></SidebarMenuItem>
          <SidebarMenuItem><a href="#awards" onClick={toggleSidebar}>AWARDS</a></SidebarMenuItem>
        </SidebarMenu>
      </SidebarContainer>
      <SidebarToggle onClick={toggleSidebar}>
        ☰
      </SidebarToggle>
    </>
  );
};

export default Sidebar;
