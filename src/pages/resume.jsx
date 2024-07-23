import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';

const Container = styled.div`
  display: flex;
  background-color: #ffffff;
  height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
  margin-left: 300px;
  height: 100%;
  overflow-y: auto;
`;

const Section = styled.section`
  margin-bottom: 100px;
`;

const SectionTitle = styled.h2`
  font-family: 'Saira Extra Condensed', serif;
  color: #e65c00;
  margin-bottom: 20px;
  font-size: 50px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: #000000;
`;

const Name = styled.p`
  font-size: 70px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 10px;
`;

const SkillsList = styled.ul`
  list-style-type: none;
`;

const Skill = styled.li`
  font-size: 18px;
  margin-bottom: 10px;
  color: #000000;
`;

const Resume = () => {
  const [candidateData, setCandidateData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/candidates/${id}`);
        setCandidateData(response.data);
      } catch (error) {
        console.error(error);
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
    <Container>
      <Sidebar />
      <MainContent>
        <Section id="name">
          <Name>{candidateData.name}</Name>
        </Section>
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
  );
};

export default Resume;
