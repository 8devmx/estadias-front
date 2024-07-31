import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const FormContainer = styled.div`
  background-color: #f3f4f6;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 33.33%;
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
  padding: 10px 8px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 16px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #3b82f6;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-image: linear-gradient(to right, #3b82f6, #9333ea);
  color: #fff;
  border: none;
  padding: 12px;
  border-radius: 50px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const UpdateCandidateForm = () => {
  const [formData, setFormData] = useState({
    sobre_mi: '',
    experiencia: '',
    educacion: '',
    habilidades: '',
    intereses: '',
    premios: ''
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8000/candidates/${id}`);
          const data = response.data;
          setFormData({
            sobre_mi: data.sobre_mi || '',
            experiencia: data.experiencia || '',
            educacion: data.educacion || '',
            habilidades: data.habilidades || '',
            intereses: data.intereses || '',
            premios: data.premios || ''
          });
        } catch (error) {
          console.error('Error fetching candidate data:', error);
        }
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8000/candidates/${id}`, formData);
      if (response.status === 200) {
        alert('Candidato actualizado exitosamente');
        router.push(`/thanks?id=${id}`); // Redirigir a thanks.js con el ID en la URL
      }
    } catch (error) {
      console.error('Error actualizando candidato:', error);
      alert('Hubo un error al actualizar el candidato');
    }
  };

  return (
    <FormContainer>
      <FormTitle>Completa tu Curriculum</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="sobre_mi">Sobre Mí:</Label>
          <TextArea id="sobre_mi" name="sobre_mi" value={formData.sobre_mi} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label htmlFor="experiencia">Experiencia:</Label>
          <TextArea id="experiencia" name="experiencia" value={formData.experiencia} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label htmlFor="educacion">Educación:</Label>
          <TextArea id="educacion" name="educacion" value={formData.educacion} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label htmlFor="habilidades">Habilidades:</Label>
          <TextArea id="habilidades" name="habilidades" value={formData.habilidades} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label htmlFor="intereses">Intereses:</Label>
          <TextArea id="intereses" name="intereses" value={formData.intereses} onChange={handleChange} />
        </FormField>
        <FormField>
          <Label htmlFor="premios">Premios:</Label>
          <TextArea id="premios" name="premios" value={formData.premios} onChange={handleChange} />
        </FormField>
        <SubmitButton type="submit">Enviar</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default UpdateCandidateForm;
