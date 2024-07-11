import styled from 'styled-components';
import Sidebar from '../components/Sidebar';

const Container = styled.div`
  display: flex;
  background-color: #ffffff; /* Fondo blanco */
  height: 100vh; /* Altura completa de la ventana */
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff; /* Fondo blanco */
  margin-left: 300px; /* Ajustar este valor según el ancho del sidebar */
  height: 100%; /* Ocupa el 100% del alto disponible */
  overflow-y: auto; /* Añadir scroll si el contenido es largo */
`;

const Section = styled.section`
  margin-bottom: 100px; /* Espacio grande entre secciones */
`;

const SectionTitle = styled.h2`
  font-family: 'Saira Extra Condensed', serif;
  color: #e65c00; /* Color naranja */
  margin-bottom: 20px; /* Espacio entre título y contenido */
  font-size: 50px; /* Tamaño de fuente más grande */
`;

const Paragraph = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const Name = styled.p`
  font-size: 70px; /* Tamaño de fuente más grande */
  font-weight: bold;
  color: #333; /* Color oscuro para el nombre */
  margin-bottom: 10px;
`;

const Address = styled.p`
  color: #888; /* Color gris para la dirección */
  margin-bottom: 20px;
`;

const SkillsList = styled.ul`
  list-style-type: none;
`;

const Skill = styled.li`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Resume = () => {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Section id="about">
          <SectionTitle>About</SectionTitle>
          <Name>Clarence Taylor</Name>
          <Address>3542 Berry Street, Cheyenne Wells, CO 80810</Address>
          <Paragraph>(317) 585-8468, name@email.com</Paragraph>
          <Paragraph>
            I am experienced in leveraging agile frameworks to provide a robust synopsis for high level overviews...
          </Paragraph>
        </Section>
        <Section id="experience">
          <SectionTitle>Experience</SectionTitle>
          <Paragraph>
            Senior Web Developer, Intellitec Solutions, March 2013 - Present. Bring to the table win-win survival strategies to ensure proactive domination...
          </Paragraph>
          <Paragraph>
            Web Developer, Intellitec Solutions, December 2011 - March 2013. Capitalize on low hanging fruit to identify a ballpark value added activity...
          </Paragraph>
        </Section>
        <Section id="education">
          <SectionTitle>Education</SectionTitle>
          <Paragraph>
            University of Colorado, August 2006 - May 2010. Bachelor of Science in Computer Science...
          </Paragraph>
        </Section>
        <Section id="skills">
          <SectionTitle>Skills</SectionTitle>
          <SkillsList>
            <Skill>JavaScript</Skill>
            <Skill>React.js</Skill>
            <Skill>Node.js</Skill>
            {/* Agrega más habilidades según sea necesario */}
          </SkillsList>
        </Section>
      </MainContent>
    </Container>
  );
};

export default Resume;
