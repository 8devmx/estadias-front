import React, { useState } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import {Candidates} from '@/services/candidates';
import useSWR from 'swr';
import ButtonTable from '@/components/CandidatesComponents/ButtonTable';
import styles from '@/styles/Componenadm.module.css';
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


// const fetcher = async () => {
//   const data = await Candidates();
//   // console.log(data);  verificar primero que data tenga los datos que trae Candidates del services
//   return data.data.Candidates;
// }

const CandidateData = () => {
  const { data, error, isLoading, mutate } = useSWR('http://localhost:8000/candidates', fetcher);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState(null);

  // console.log({data, error, isLoading}) verifivcar que trae data, error e isloading
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
        {/* Primer input */}
        <div className="w-1/2">
          <input
            type="text"
            id={styles.input}
            name="first-input"
            placeholder="Buscar"
            className="mt-1 block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />
        </div>
        {/* Botón */}
        <div className="w-1/6 flex items-end">
        <button
            className="mt-1 block w-full rounded-md bg-black text-white py-2 px-4" onClick={handleAddClick}
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
            <th>Telefóno</th>
            <th>Correo</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => ( //se cambio data por candidates
            <tr key={index} className="hover">
              <th>{candidate.id}</th> 
              <td>{candidate.name}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.email}</td>
              <td>{candidate.address}</td>
              <td>
                <ButtonTable id={candidate.id} mutate={mutate} onEdit={() => handleEditClick(candidate)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        {showForm && <PopupInsertC onClose={handleCloseForm} mutate={mutate} />}
        {showEditForm && <PopupEdit onClose={handleCloseForm} mutate={mutate} candidate={currentCandidate} />}
    </LayoutAdmin>
  );
}

export default CandidateData;