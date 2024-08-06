import React, { useState } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import useSWR from 'swr';
import ButtonTable from '@/components/CandidatesComponents/ButtonTable';
import PopupInsertC from '@/components/CandidatesComponents/PopupInsertC';
import PopupEdit from '@/components/CandidatesComponents/PopupUpdateC';
import RequireAuth from '@/components/UtilsComponents/RequireAuth';

// manejo del encabezado trae el encabezado y el token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// modificacion de la funcion fetcher para que pueda manejar los encabezados 
const fetcher = async (url) => {
  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(errorDetails || 'Error fetching data');
  }
  const data = await response.json();
  console.log('Fetched data:', data); 
  return data.candidates; //para devolver el array directamente
};

const CandidateData = () => {
  const { data, error, isLoading, mutate } = useSWR('http://localhost:8000/candidates', fetcher);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState(null);

  if (error) return <div><RequireAuth /></div>;
  if (isLoading) return <div>Cargando...</div>;

  const candidates = data || []; // para que sia simpre un array evitando valores undefined

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleEditClick = (candidate) => {
    setCurrentCandidate(candidate);
    setShowEditForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowEditForm(false);
  };

  return (
    <LayoutAdmin>
      <h1 className="text-xl font-bold mb-6">Candidatos</h1>
      <div className="flex justify-between p-4">
        <div className="flex-grow"></div>
        <div className="w-1/6 flex items-end justify-end">
          <button
            className="mt-1 block w-full rounded-md bg-black text-white py-2 px-4"
            onClick={handleAddClick}
          >
            Agregar
          </button>
        </div>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th className='text-center'>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(
            (
              candidate,
              index //se cambio data por candidates
            ) => (
              <tr key={index} className="hover">
                <th>{candidate.id}</th>
                <td>{candidate.name}</td>
                <td>{candidate.phone}</td>
                <td>
                  <a href={`mailto:${candidate.email}`} target="_BLANK">
                    {candidate.email}
                  </a>
                </td>
                <td>{candidate.address}</td>
                <td className="text-center">
                  <img
                    src={candidate.foto_perfil || '/candidatos/PerfilUsuarioNull.avif'}
                    alt="Foto de perfil"
                    style={{
                      maxHeight: "45px",
                      display: "block",
                      margin: "auto",
                    }}
                  />
                </td>
                <td>
                  <ButtonTable
                    id={candidate.id}
                    mutate={mutate}
                    onEdit={() => handleEditClick(candidate)}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {showForm && <PopupInsertC onClose={handleCloseForm} mutate={mutate} />}
      {showEditForm && (
        <PopupEdit
          onClose={handleCloseForm}
          mutate={mutate}
          candidate={currentCandidate}
        />
      )}
    </LayoutAdmin>
  );
}

export default CandidateData;
