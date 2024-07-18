import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
  color: #000000;  // Cambia el color del párrafo a negro
`;

const Name = styled.p`
  font-size: 70px;
  font-weight: bold;
  color: #000000;  // Cambia el color del nombre a negro
  margin-bottom: 10px;
`;

const SkillsList = styled.ul`
  list-style-type: none;
`;

const Skill = styled.li`
  font-size: 18px;
  margin-bottom: 10px;
  color: #000000;  // Cambia el color de las habilidades a negro
`;

const Resume = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/forms/latest');
        setFormData(response.data.form);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Section id="name">
          <Name>John Doe</Name>
        </Section>
        <Section id="about">
          <SectionTitle>About</SectionTitle>
          <Paragraph>{formData.about_me}</Paragraph>
        </Section>
        <Section id="experience">
          <SectionTitle>Experience</SectionTitle>
          <Paragraph>{formData.experience}</Paragraph>
        </Section>
        <Section id="education">
          <SectionTitle>Education</SectionTitle>
          <Paragraph>{formData.education}</Paragraph>
        </Section>
        <Section id="skills">
          <SectionTitle>Skills</SectionTitle>
          <SkillsList>
            {formData.skills.split(',').map((skill, index) => (
              <Skill key={index}>{skill}</Skill>
            ))}
          </SkillsList>
        </Section>
        <Section id="interests">
          <SectionTitle>Interests</SectionTitle>
          <Paragraph>{formData.interests}</Paragraph>
        </Section>
        <Section id="awards">
          <SectionTitle>Awards</SectionTitle>
          <Paragraph>{formData.awards}</Paragraph>
        </Section>
      </MainContent>
    </Container>
  );
};

export default Resume;
