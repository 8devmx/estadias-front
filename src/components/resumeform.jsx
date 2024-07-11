// components/ResumeForm.jsx
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f2f2f2;
  padding: 20px;
`;

const FormWrapper = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h2`
  font-family: 'Merriweather', serif;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #e65c00;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const FormSection = styled.div`
  margin-bottom: 40px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #333;
`;

const ResumeForm = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, como enviar datos a un servidor

    // Redirigir a la página de agradecimiento
    router.push('/thanks');
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <FormContainer>
      <FormWrapper>
        <Title>Formulario de Currículum</Title>
        <form onSubmit={handleSubmit}>
          <FormSection>
            <FormLabel htmlFor="about">Sobre mí</FormLabel>
            <TextArea id="about" name="about" rows="4" placeholder="Cuéntanos sobre ti..." />
          </FormSection>

          <FormSection>
            <FormLabel htmlFor="experience">Experiencia</FormLabel>
            <TextArea id="experience" name="experience" rows="4" placeholder="Describe tu experiencia..." />
          </FormSection>

          <FormSection>
            <FormLabel htmlFor="education">Educación</FormLabel>
            <TextArea id="education" name="education" rows="4" placeholder="Indica tu formación académica..." />
          </FormSection>

          <FormSection>
            <FormLabel htmlFor="skills">Habilidades</FormLabel>
            <TextArea id="skills" name="skills" rows="4" placeholder="Enumera tus habilidades..." />
          </FormSection>

          <FormSection>
            <FormLabel htmlFor="photo">Foto</FormLabel>
            <Input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} />
          </FormSection>

          <Button type="submit">Enviar</Button>
        </form>
      </FormWrapper>
    </FormContainer>
  );
};

export default ResumeForm;
