import React, { useState } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import { Landings } from '@/services/landings';
import useSWR from 'swr';
import ButtonTable from '@/components/LandingsComponents/ButtonTable';
import PopupEditL from '@/components/LandingsComponents/PopupEditL';
import PopupInsertL from '@/components/LandingsComponents/PopupInsertL';
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
  return data.landings; //para devolver el array directamente
};
// const fetcher = async () => {
//   const data = await Landings();
//   return data.data.landings;
// }

const LandingsData = () => {
  const { data, error, isLoading, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_KEY}/landings`, fetcher);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentLanding, setCurrentLanding] = useState(null);

  if (error) return <div><RequireAuth /></div>;
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
    const obj = JSON.parse(field) || {}
    return obj?.title || "Sín título"
  };
  

  return (
    <LayoutAdmin>
      <h1 className="text-xl font-bold mb-6">Landings</h1>
      <div className="flex justify-between p-4">
        <div className="w-1/2">
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Logo</th>
            <th>Hero</th>
            <th>Empresa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((landing, index) => (
            <tr key={index} className="hover">
              <th>{landing.id}</th>
              <td>
                <a href={`http://localhost:3000/landings/${landing.slugs}`} target='_BLANK'>
                  <img src={`/${landing.logo}`} style={{'maxHeight': '25px', 'display': 'block', 'margin': 'auto'}} />
                </a>
              </td>
              <td>{parseJsonField(landing.hero)}</td>
              <td>{landing.name}</td>
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
