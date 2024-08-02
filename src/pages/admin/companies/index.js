import React, { useState } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import { Company } from '@/services/company';
import useSWR from 'swr';
import ButtonTable from '@/components/CompanyComponents/ButtonTable';
import PopupEditC from '@/components/CompanyComponents/PopupEditC';
import styles from '@/styles/Componenadm.module.css';
import PopupInsertC from '@/components/CompanyComponents/PopupInsertC';
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
    return data.companies; //para devolver el array directamente
  };
  

// const fetcher = async () => {
//   const data = await Company();
//   return data.data.company;
// }

const CompanyData = () => {
  const { data, error, isLoading, mutate } = useSWR('http://localhost:8000/company', fetcher)
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);

  if (error) return <div><RequireAuth /></div>;
  if (isLoading) return <div>Cargando</div>;

  const companies  = data || [];

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleEditClick = (company) => {
    setCurrentCompany(company);
    setShowEditForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowEditForm(false);
  };

  return (
    <LayoutAdmin>
      <h1 className="text-xl font-bold mb-6">Companies</h1>
      <div className="flex justify-between p-4">
        <div className="w-1/2">

          <input
            type="text"
            id={styles.input}
            name="first-input"
            placeholder="Buscar"
            className="mt-1 block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />


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
            <th>Name</th>
            <th>Mail</th>
            <th>Phone</th>
            <th>Contact</th>
            <th>Logo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {companies .map((company, index) => (
            <tr key={index} className="hover">
              <th>{company.id}</th>
              <td>{company.name}</td>
              <td>{company.mail}</td>
              <td>{company.phone}</td>
              <td>{company.contact}</td>
              <td>{company.logo}</td>
              <td>
                <ButtonTable id={company.id} mutate={mutate} onEdit={() => handleEditClick(company)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && <PopupInsertC onClose={handleCloseForm} mutate={mutate} />}
      {showEditForm && <PopupEditC onClose={handleCloseForm} mutate={mutate} company={currentCompany} />}
    </LayoutAdmin>
  );
}

export default CompanyData;