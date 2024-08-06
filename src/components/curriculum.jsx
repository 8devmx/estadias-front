import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import Head from 'next/head';

const Container = styled.div`
  display: flex;
  background-color: #ffffff;
  height: 100vh;
  flex-direction: column;

  @media(min-width: 768px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  margin-left: 0;
  height: auto;
  overflow-y: auto;

  @media(min-width: 768px) {
    margin-left: 300px;
    height: 100%;
  }
`;

const Header = styled.div`
  margin-bottom: 20px;
  border-bottom: 2px solid #e65c00;
  padding-bottom: 10px;
`;

const Name = styled.h1`
  font-size: 60px; /* Tamaño de fuente reducido para pantallas pequeñas */
  font-weight: bold;
  color: #333;
  margin: 0 0 20px 0;
  font-family: 'Saira Extra Condensed', sans-serif;

  @media(min-width: 768px) {
    font-size: 100px; /* Tamaño de fuente aumentado para pantallas más grandes */
  }
`;

const ContactInfo = styled.div`
  margin-top: 5px;
  text-align: left;
`;

const ContactItem = styled.p`
  margin: 2px 0;
  font-size: 14px;
  color: #666;
  font-family: 'Open Sans', sans-serif;

  @media(min-width: 768px) {
    font-size: 16px; /* Ajuste de tamaño de fuente para pantallas más grandes */
  }
`;

const Section = styled.section`
  margin-bottom: 50px;

  @media(min-width: 768px) {
    margin-bottom: 100px; /* Aumentar el espacio en pantallas más grandes */
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Saira Extra Condensed', sans-serif;
  color: #000;
  margin-bottom: 10px;
  font-size: 30px;

  @media(min-width: 768px) {
    font-size: 50px; /* Aumentar el tamaño de fuente en pantallas más grandes */
  }
`;

const Paragraph = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  color: #333;
  font-family: 'Open Sans', sans-serif;

  @media(min-width: 768px) {
    font-size: 16px; /* Ajuste de tamaño de fuente para pantallas más grandes */
  }
`;

const SkillsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Skill = styled.li`
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
  font-family: 'Open Sans', sans-serif;

  @media(min-width: 768px) {
    font-size: 16px; /* Ajuste de tamaño de fuente para pantallas más grandes */
  }
`;

const Curriculum = () => {
  const [candidateData, setCandidateData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/candidatesfront/${id}`);
        setCandidateData(response.data);
      } catch (error) {
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

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Saira+Extra+Condensed:100,200,300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container>
        <Sidebar />
        <MainContent>
          <Header>
            <Name>{candidateData.name}</Name>
            <ContactInfo>
              <ContactItem>{candidateData.email}</ContactItem>
              <ContactItem>{candidateData.phone}</ContactItem>
            </ContactInfo>
          </Header>
          <Section id="about">
            <SectionTitle>Sobre mí</SectionTitle>
            <Paragraph>{candidateData.sobre_mi}</Paragraph>
          </Section>
          <Section id="experience">
            <SectionTitle>Experiencia</SectionTitle>
            <Paragraph>{candidateData.experiencia}</Paragraph>
          </Section>
          <Section id="education">
            <SectionTitle>Educación</SectionTitle>
            <Paragraph>{candidateData.educacion}</Paragraph>
          </Section>
          <Section id="skills">
            <SectionTitle>Habilidades</SectionTitle>
            <SkillsList>
              {candidateData.habilidades && candidateData.habilidades.split(',').map((skill, index) => (
                <Skill key={index}>{skill}</Skill>
              ))}
            </SkillsList>
          </Section>
          <Section id="interests">
            <SectionTitle>Intereses</SectionTitle>
            <Paragraph>{candidateData.intereses}</Paragraph>
          </Section>
          <Section id="awards">
            <SectionTitle>Premios</SectionTitle>
            <Paragraph>{candidateData.premios}</Paragraph>
          </Section>
        </MainContent>
      </Container>
    </>
  );
};

export default Curriculum;
