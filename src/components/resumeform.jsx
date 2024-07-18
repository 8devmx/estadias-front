import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const FormContainer = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 50px auto;
  font-family: 'Arial', sans-serif;
`;

const FormTitle = styled.h2`
  color: #e65c00;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    border-color: #e65c00;
    outline: none;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #e65c00;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #e65c00;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cf5400;
  }
`;

const ResumeForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    about_me: '',
    experience: '',
    education: '',
    skills: '',
    interests: '',
    awards: '',
    profile_picture: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    for (const key in formData) {
      if (formData[key].trim() === '') {
        alert(`El campo ${key.replace('_', ' ')} no puede estar vacío.`);
        return;
      }
    }

    try {
      const response = await axios.post('http://localhost:8000/forms', formData);
      console.log('Form submitted successfully:', response.data);
      router.push('/thanks'); // Redirigir a la página de agradecimiento
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormTitle>Formulario de Currículum Vitae</FormTitle>
        <FormField>
          <Label>Sobre mí</Label>
          <TextArea name="about_me" value={formData.about_me} onChange={handleChange} placeholder="Cuéntanos sobre ti..." />
        </FormField>
        <FormField>
          <Label>Experiencia</Label>
          <TextArea name="experience" value={formData.experience} onChange={handleChange} placeholder="Describe tu experiencia..." />
        </FormField>
        <FormField>
          <Label>Educación</Label>
          <TextArea name="education" value={formData.education} onChange={handleChange} placeholder="Indica tu formación académica..." />
        </FormField>
        <FormField>
          <Label>Habilidades</Label>
          <TextArea name="skills" value={formData.skills} onChange={handleChange} placeholder="Enumera tus habilidades..." />
        </FormField>
        <FormField>
          <Label>Intereses</Label>
          <TextArea name="interests" value={formData.interests} onChange={handleChange} placeholder="Cuéntanos sobre tus intereses..." />
        </FormField>
        <FormField>
          <Label>Premios</Label>
          <TextArea name="awards" value={formData.awards} onChange={handleChange} placeholder="Indica tus premios y reconocimientos..." />
        </FormField>
        <FormField>
          <Label>Foto de Perfil (URL)</Label>
          <Input type="text" name="profile_picture" value={formData.profile_picture} onChange={handleChange} placeholder="URL de la foto de perfil..." />
        </FormField>
        <Button type="submit">Enviar</Button>
      </form>
    </FormContainer>
  );
};

export default ResumeForm;
