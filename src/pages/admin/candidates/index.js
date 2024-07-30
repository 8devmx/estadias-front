import React, { useState } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import {Candidates} from '@/services/candidates';
import useSWR from 'swr';
import ButtonTable from '@/components/CandidatesComponents/ButtonTable';
import styles from '@/styles/Componenadm.module.css';
import PopupInsertC from '@/components/CandidatesComponents/PopupInsertC';
import PopupEdit from '@/components/CandidatesComponents/PopupUpdateC';

const fetcher = async () => {
  const data = await Candidates();
  // console.log(data);  verificar primero que data tenga los datos que trae Candidates del services
  return data.data.Candidates;
}

const CandidateData = () => {
  const { data, error, isLoading, mutate } = useSWR('http://localhost:8000/candidates', fetcher)
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentCandidates, setCurrentCandidate] = useState(null);

  // console.log({data, error, isLoading}) verifivcar que trae data, error e isloading
  if (error) return <div>Error al cargar</div>;
  if (isLoading) return <div>Cargando</div>;

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
            <th>Sobre mi</th>
            <th>Experiencia</th>
            <th>Educación</th>
            <th>Intereses</th>
            <th>Premios</th>
            <th>foto</th>
          </tr>
        </thead>
        <tbody>
          {data.map((candidates, index) => (
            <tr key={index} className="hover">
              <th>{candidates.id}</th>
              <td>{candidates.name}</td>
              <td>{candidates.phone}</td>
              <td>{candidates.email}</td>
              <td>{candidates.address}</td>
              <th>{candidates.sobre_mi}</th>
              <th>{candidates.experiencia}</th>
              <th>{candidates.educacion}</th>
              <th>{candidates.habilidades}</th>
              <th>{candidates.intereses}</th>
              <th>{candidates.premios}</th>
              <th>{candidates.foto_perfil}</th>
              <td>
                <ButtonTable id={candidates.id} mutate={mutate} onEdit={() => handleEditClick(candidates)} />
              </td>
            </tr>
          ))}
        </tbody>
        {showForm && <PopupInsertC onClose={handleCloseForm} mutate={mutate} />}
        {showEditForm && <PopupEdit onClose={handleCloseForm} mutate={mutate} candidates={currentCandidates} />}
      </table>
    </LayoutAdmin>
  );
}

export default CandidateData;
