import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #FFDAB9;
  padding: 20px;
`;

const FormWrapper = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  border: 1px solid #FFDAB9;
`;

const Title = styled.h1`
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  color: #FF6347;
  margin-bottom: 20px;
  text-align: center;
  font-size: 2.5rem;
`;

const Subtitle = styled.p`
  font-family: 'Oswald', sans-serif;
  font-weight: 400;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #FF6347;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Oswald', sans-serif;
  font-weight: 300;
  background-color: #fff;
  color: #333;
  &:focus {
    border-color: #FF4500;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #FF6347;
  border-radius: 10px;
  font-size: 16px;
  font-family: 'Oswald', sans-serif;
  font-weight: 300;
  background-color: #fff;
  color: #333;
  &:focus {
    border-color: #FF4500;
  }
`;

const FileInput = styled.input`
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #FF6347;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 18px;
  font-family: 'Oswald', sans-serif;
  font-weight: 500;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #FF4500;
  }
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #333;
  font-family: 'Oswald', sans-serif;
  font-weight: 400;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 16px;
`;

const ResumeForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    about: '',
    experience: '',
    education: '',
    skills: '',
    interests: '',
    awards: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.about) tempErrors.about = 'El campo sobre mí es obligatorio.';
    if (!formData.experience) tempErrors.experience = 'El campo experiencia es obligatorio.';
    if (!formData.education) tempErrors.education = 'El campo educación es obligatorio.';
    if (!formData.skills) tempErrors.skills = 'El campo habilidades es obligatorio.';
    if (!formData.interests) tempErrors.interests = 'El campo intereses es obligatorio.';
    if (!formData.awards) tempErrors.awards = 'El campo premios es obligatorio.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const data = new FormData();
      data.append('about', formData.about);
      data.append('experience', formData.experience);
      data.append('education', formData.education);
      data.append('skills', formData.skills);
      data.append('interests', formData.interests);
      data.append('awards', formData.awards);
      if (profileImage) {
        data.append('profileImage', profileImage);
      }
      try {
        const response = await axios.post('http://tu-servidor-laravel/api/update-profile', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          setSuccess('Formulario enviado con éxito.');
          router.push('/thanks');
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        setErrors({ submit: 'Hubo un problema al enviar el formulario. Inténtalo de nuevo más tarde.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
        <Title>Formulario de Curriculum Vitae</Title>
        <Subtitle>Complete los campos a continuación para actualizar su perfil profesional</Subtitle>
        {success && <SuccessMessage>{success}</SuccessMessage>}
        {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <FormSection>
            <FormLabel htmlFor="about">Sobre mí *</FormLabel>
            <TextArea 
              id="about" 
              name="about" 
              rows="4" 
              placeholder="Cuéntanos sobre ti..." 
              value={formData.about} 
              onChange={handleChange} 
              required 
            />
            {errors.about && <ErrorMessage>{errors.about}</ErrorMessage>}
          </FormSection>

          <FormSection>
            <FormLabel htmlFor="experience">Experiencia *</FormLabel>
            <TextArea 
              id="experience" 
              name="experience" 
              rows="4" 
              placeholder="Describe tu experiencia..." 
              value={formData.experience} 
              onChange={handleChange} 
              required 
            />
            {errors.experience && <ErrorMessage>{errors.experience}</ErrorMessage>}
          </FormSection>

          <FormSection>
            <FormLabel htmlFor="education">Educación *</FormLabel>
            <TextArea 
              id="education" 
              name="education" 
              rows="4" 
              placeholder="Indica tu formación académica..." 
              value={formData.education} 
              onChange={handleChange} 
              required 
            />
            {errors.education && <ErrorMessage>{errors.education}</ErrorMessage>}
          </FormSection>

          <FormSection>
            <FormLabel htmlFor="skills">Habilidades *</FormLabel>
            <TextArea 
              id="skills" 
              name="skills" 
              rows="4" 
              placeholder="Enumera tus habilidades..." 
              value={formData.skills} 
              onChange={handleChange} 
              required 
            />
            {errors.skills && <ErrorMessage>{errors.skills}</ErrorMessage>}
          </FormSection>

          <FormSection>
            <FormLabel htmlFor="interests">Intereses *</FormLabel>
            <TextArea 
              id="interests" 
              name="interests" 
              rows="4" 
              placeholder="Cuéntanos sobre tus intereses..." 
              value={formData.interests} 
              onChange={handleChange} 
              required 
            />
            {errors.interests && <ErrorMessage>{errors.interests}</ErrorMessage>}
          </FormSection>

          <FormSection>
            <FormLabel htmlFor="awards">Premios *</FormLabel>
            <TextArea 
              id="awards" 
              name="awards" 
              rows="4" 
              placeholder="Indica tus premios y reconocimientos..." 
              value={formData.awards} 
              onChange={handleChange} 
              required 
            />
            {errors.awards && <ErrorMessage>{errors.awards}</ErrorMessage>}
          </FormSection>

          <FormSection>
            <FormLabel htmlFor="profileImage">Foto de Perfil</FormLabel>
            <FileInput 
              id="profileImage" 
              name="profileImage" 
              type="file" 
              onChange={handleFileChange} 
              accept="image/*"
            />
          </FormSection>

          <Button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'ENVIAR'}
          </Button>
        </form>
        <p style={{ color: '#333', marginTop: '20px' }}>* los campos son obligatorios.</p>
      </FormWrapper>
    </FormContainer>
  );
};

export default ResumeForm;
