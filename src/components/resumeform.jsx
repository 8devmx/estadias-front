// components/ResumeForm.jsx
import styled from 'styled-components';
import { useRouter } from 'next/router';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, como enviar datos a un servidor

    // Redirigir a la página de agradecimiento
    router.push('/thanks');
  };

  return (
    <FormContainer>
      <FormWrapper>
        <Title>Resume Form</Title>
        <form onSubmit={handleSubmit}>
          <FormSection>
            <FormLabel htmlFor="about">About</FormLabel>
            <TextArea id="about" name="about" rows="4" placeholder="Tell us about yourself..." />
          </FormSection>

          <FormSection>
            <FormLabel htmlFor="experience">Experience</FormLabel>
            <TextArea id="experience" name="experience" rows="4" placeholder="Describe your experience..." />
          </FormSection>

          <FormSection>
            <FormLabel htmlFor="education">Education</FormLabel>
            <TextArea id="education" name="education" rows="4" placeholder="List your education background..." />
          </FormSection>

          <FormSection>
            <FormLabel htmlFor="skills">Skills</FormLabel>
            <TextArea id="skills" name="skills" rows="4" placeholder="List your skills..." />
          </FormSection>

          <Button type="submit">Submit</Button>
        </form>
      </FormWrapper>
    </FormContainer>
  );
};

export default ResumeForm;

