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

const SubmitButton = styled.button`
  width: 100%;
  background-color: #e65c00;
  color: #fff;
  border: none;
  padding: 15px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc5200;
  }
`;

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    sobre_mi: '',
    experiencia: '',
    educacion: '',
    habilidades: '',
    intereses: '',
    premios: '',
    foto_perfil: ''
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/candidates', formData);
      if (response.status === 201) {
        alert('Candidato creado exitosamente');
        router.push({
          pathname: '/thanks',
          query: { name: formData.name, id: response.data.candidate.id } // Redirige con el ID del candidato
        });
      }
    } catch (error) {
      console.error('Error creando candidato:', error);
      alert('Hubo un error al crear el candidato');
    }
  };

  return (
    <FormContainer>
      <FormTitle>Formulario de Candidato</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="name">Nombre</Label>
          <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </FormField>
        <FormField>
          <Label htmlFor="phone">Teléfono</Label>
          <Input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </FormField>
        <FormField>
          <Label htmlFor="address">Dirección</Label>
          <Input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label htmlFor="sobre_mi">Sobre Mí</Label>
          <TextArea id="sobre_mi" name="sobre_mi" value={formData.sobre_mi} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label htmlFor="experiencia">Experiencia</Label>
          <TextArea id="experiencia" name="experiencia" value={formData.experiencia} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label htmlFor="educacion">Educación</Label>
          <TextArea id="educacion" name="educacion" value={formData.educacion} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label htmlFor="habilidades">Habilidades</Label>
          <TextArea id="habilidades" name="habilidades" value={formData.habilidades} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label htmlFor="intereses">Intereses</Label>
          <TextArea id="intereses" name="intereses" value={formData.intereses} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label htmlFor="premios">Premios</Label>
          <TextArea id="premios" name="premios" value={formData.premios} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label htmlFor="foto_perfil">Foto de Perfil</Label>
          <Input type="text" id="foto_perfil" name="foto_perfil" value={formData.foto_perfil} onChange={handleChange} />
        </FormField>
        <SubmitButton type="submit">Enviar</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ResumeForm;
