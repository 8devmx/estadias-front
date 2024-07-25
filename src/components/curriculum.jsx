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

const Header = styled.div`
  margin-bottom: 20px;
  border-bottom: 2px solid #e65c00;
  padding-bottom: 10px;
`;

const Name = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

const ContactInfo = styled.div`
  margin-top: 5px;
  text-align: left;
`;

const ContactItem = styled.p`
  margin: 2px 0;
  font-size: 16px;
  color: #666;
`;

const Section = styled.section`
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  font-family: 'Saira Extra Condensed', serif;
  color: #e65c00;
  margin-bottom: 10px;
  font-size: 24px;
`;

const Paragraph = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
`;

const SkillsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Skill = styled.li`
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
`;

const Curriculum = () => {
  const [candidateData, setCandidateData] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/candidates/${id}`);
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
  );
};

export default Curriculum;
