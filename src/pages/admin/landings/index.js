import React, { useState } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import { Landings } from '@/services/landings';
import useSWR from 'swr';
import ButtonTable from '@/components/LandingsComponents/ButtonTable';
import PopupEditL from '@/components/LandingsComponents/PopupEditL';
import PopupInsertL from '@/components/LandingsComponents/PopupInsertL';

const fetcher = async () => {
  const data = await Landings();
  return data.data.landings;
}

const LandingsData = () => {
  const { data, error, isLoading, mutate } = useSWR('http://localhost:8000/landings', fetcher);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentLanding, setCurrentLanding] = useState(null);

  if (error) return <div>Error al cargar</div>;
  if (isLoading) return <div>Cargando</div>;

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleEditClick = (landing) => {
    setCurrentLanding(landing);
    setShowEditForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowEditForm(false);
  };

  const parseJsonField = (field) => {
    try {
      return JSON.stringify(JSON.parse(field), null, 2);
    } catch (e) {
      return field;
    }
  };
  

  return (
    <LayoutAdmin>
      <h1 className="text-xl font-bold mb-6">Landings</h1>
      <div className="flex justify-between p-4">
        <div className="w-1/2">
        </div>
        <div className="w-1/6 flex items-end">
          <button
            className="mt-1 block w-full rounded-md bg-black text-white py-2 px-4" onClick={handleAddClick}
          >
            Agregar
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Slugs</th>
            <th>Logo</th>
            <th>Hero</th>
            <th>Services</th>
            <th>Packages</th>
            <th>Company_ID</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((landing, index) => (
            <tr key={index} className="hover">
              <th>{landing.id}</th>
              <td>{landing.slugs}</td>
              <td>{landing.logo}</td>
              <td><pre>{parseJsonField(landing.hero)}</pre></td>
              <td><pre>{parseJsonField(landing.services)}</pre></td>
              <td><pre>{parseJsonField(landing.packages)}</pre></td>
              <td>{landing.company_id}</td>
              <td>
                <ButtonTable id={landing.id} mutate={mutate} onEdit={() => handleEditClick(landing)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && <PopupInsertL onClose={handleCloseForm} mutate={mutate} />}
      {showEditForm && <PopupEditL onClose={handleCloseForm} mutate={mutate} landing={currentLanding} />}
    </LayoutAdmin>
  );
}

export default LandingsData;
