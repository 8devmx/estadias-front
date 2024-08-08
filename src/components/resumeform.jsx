// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// import { useRouter } from 'next/router';

// const FormContainer = styled.div`
//   background-color: #f3f4f6;
//   padding: 24px;
//   border-radius: 8px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
//   width: 33.33%;
//   margin: 50px auto;
//   font-family: 'Arial', sans-serif;
// `;

// const FormTitle = styled.h2`
//   color: #e65c00;
//   text-align: center;
//   margin-bottom: 20px;
//   font-size: 24px;
// `;

// const FormField = styled.div`
//   margin-bottom: 20px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 8px;
//   font-weight: bold;
//   color: #333;
// `;

// const TextArea = styled.textarea`
//   width: 100%;
//   padding: 10px 8px;
//   border-radius: 6px;
//   border: 1px solid #d1d5db;
//   font-size: 16px;
//   transition: border-color 0.3s;
//   &:focus {
//     border-color: #3b82f6;
//     outline: none;
//   }
// `;

// const SubmitButton = styled.button`
//   width: 100%;
//   background-image: linear-gradient(to right, #3b82f6, #9333ea);
//   color: #fff;
//   border: none;
//   padding: 12px;
//   border-radius: 50px;
//   font-size: 18px;
//   cursor: pointer;
//   transition: background-color 0.3s;
//   &:hover {
//     box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
//   }
// `;

// const FileInput = styled.input`
//   width: 100%;
//   padding: 10px 8px;
//   border-radius: 6px;
//   border: 1px solid #d1d5db;
//   font-size: 16px;
//   transition: border-color 0.3s;
//   &:focus {
//     border-color: #3b82f6;
//     outline: none;
//   }
// `;

// const FileName = styled.p`
//   margin-top: 8px;
//   font-size: 14px;
//   color: #4b5563;
// `;

// const ResumeForm = () => {
//   const [formData, setFormData] = useState({
//     sobre_mi: '',
//     experiencia: '',
//     educacion: '',
//     habilidades: '',
//     intereses: '',
//     premios: '',
//     foto_perfil: ''
//   });

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     const fetchData = async () => {
//       if (id) {
//         setLoading(true);
//         try {
//           const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/candidatesfront/${id}`);
//           const data = response.data;
//           setFormData({
//             sobre_mi: data.sobre_mi || '',
//             experiencia: data.experiencia || '',
//             educacion: data.educacion || '',
//             habilidades: data.habilidades || '',
//             intereses: data.intereses || '',
//             premios: data.premios || '',
//             foto_perfil: data.foto_perfil || ''
//           });
//         } catch (error) {
//           console.error('Error fetching candidate data:', error);
//           setError('Error al cargar los datos del candidato.');
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         foto_perfil: file.name
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formDataToSend = new FormData();
    
//     // Append text fields
//     Object.keys(formData).forEach(key => {
//       if (key !== 'foto_perfil') {
//         formDataToSend.append(key, formData[key]);
//       }
//     });
    
//     // Append file if selected
//     if (selectedFile) {
//       formDataToSend.append('foto_perfil', selectedFile);
//     }

//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/candidatesfront/${id}`, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       if (response.status === 200) {
//         alert('Candidato actualizado exitosamente');
//         router.push(`/thanks?id=${id}`);
//       } else {
//         setError('Error al actualizar los datos del candidato.');
//       }
//     } catch (error) {
//       console.error('Error actualizando candidato:', error);
//       setError('Hubo un error al actualizar el candidato.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <FormContainer>
//       <FormTitle>Completa tu Curriculum</FormTitle>
//       {loading ? (
//         <p>Cargando...</p>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <FormField>
//             <Label htmlFor="sobre_mi">Sobre Mí:</Label>
//             <TextArea
//               id="sobre_mi"
//               name="sobre_mi"
//               value={formData.sobre_mi}
//               onChange={handleChange}
//             />
//           </FormField>
//           <FormField>
//             <Label htmlFor="experiencia">Experiencia:</Label>
//             <TextArea
//               id="experiencia"
//               name="experiencia"
//               value={formData.experiencia}
//               onChange={handleChange}
//             />
//           </FormField>
//           <FormField>
//             <Label htmlFor="educacion">Educación:</Label>
//             <TextArea
//               id="educacion"
//               name="educacion"
//               value={formData.educacion}
//               onChange={handleChange}
//             />
//           </FormField>
//           <FormField>
//             <Label htmlFor="habilidades">Habilidades:</Label>
//             <TextArea
//               id="habilidades"
//               name="habilidades"
//               value={formData.habilidades}
//               onChange={handleChange}
//             />
//           </FormField>
//           <FormField>
//             <Label htmlFor="intereses">Intereses:</Label>
//             <TextArea
//               id="intereses"
//               name="intereses"
//               value={formData.intereses}
//               onChange={handleChange}
//             />
//           </FormField>
//           <FormField>
//             <Label htmlFor="premios">Premios:</Label>
//             <TextArea
//               id="premios"
//               name="premios"
//               value={formData.premios}
//               onChange={handleChange}
//             />
//           </FormField>
//           <FormField>
//             <Label htmlFor="foto_perfil">Foto de perfil:</Label>
//             <FileInput
//               type="file"
//               id="foto_perfil"
//               name="foto_perfil"
//               onChange={handleFileChange}
//             />
//             {formData.foto_perfil && <FileName>Archivo seleccionado: {formData.foto_perfil}</FileName>}
//           </FormField>
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//           <SubmitButton type="submit" disabled={loading}>Enviar</SubmitButton>
//         </form>
//       )}
//     </FormContainer>
//   );
// };

// export default ResumeForm;


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

const FileInput = styled.input`
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

const FileName = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #4b5563;
`;

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    sobre_mi: '',
    experiencia: '',
    educacion: '',
    habilidades: '',
    intereses: '',
    premios: '',
    foto_perfil: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/candidatesfront/${id}`);
          const data = response.data;
          setFormData({
            sobre_mi: data.sobre_mi || '',
            experiencia: data.experiencia || '',
            educacion: data.educacion || '',
            habilidades: data.habilidades || '',
            intereses: data.intereses || '',
            premios: data.premios || '',
            foto_perfil: data.foto_perfil || ''
          });
        } catch (error) {
          console.error('Error fetching candidate data:', error);
          setError('Error al cargar los datos del candidato.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          foto_perfil: reader.result // base64 string
        }));
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}/candidatesfront/${id}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        alert('Candidato actualizado exitosamente');
        router.push(`/thanks?id=${id}`);
      } else {
        setError('Error al actualizar los datos del candidato.');
      }
    } catch (error) {
      console.error('Error actualizando candidato:', error);
      console.error('Response data:', error.response?.data);
      setError('Hubo un error al actualizar el candidato.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>Completa tu Curriculum</FormTitle>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="sobre_mi">Sobre Mí:</Label>
            <TextArea
              id="sobre_mi"
              name="sobre_mi"
              value={formData.sobre_mi}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <Label htmlFor="experiencia">Experiencia:</Label>
            <TextArea
              id="experiencia"
              name="experiencia"
              value={formData.experiencia}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <Label htmlFor="educacion">Educación:</Label>
            <TextArea
              id="educacion"
              name="educacion"
              value={formData.educacion}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <Label htmlFor="habilidades">Habilidades:</Label>
            <TextArea
              id="habilidades"
              name="habilidades"
              value={formData.habilidades}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <Label htmlFor="intereses">Intereses:</Label>
            <TextArea
              id="intereses"
              name="intereses"
              value={formData.intereses}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <Label htmlFor="premios">Premios:</Label>
            <TextArea
              id="premios"
              name="premios"
              value={formData.premios}
              onChange={handleChange}
            />
          </FormField>
          <FormField>
            <Label htmlFor="foto_perfil">Foto de perfil:</Label>
            <FileInput
              type="file"
              id="foto_perfil"
              name="foto_perfil"
              onChange={handleFileChange}
            />
            {formData.foto_perfil && <FileName>Archivo seleccionado: </FileName>}
          </FormField>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <SubmitButton type="submit" disabled={loading}>Enviar</SubmitButton>
        </form>
      )}
    </FormContainer>
  );
};

export default ResumeForm;
