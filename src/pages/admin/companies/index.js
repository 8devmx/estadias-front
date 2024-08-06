import React, { useState } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import useSWR from 'swr';
import ButtonTable from '@/components/CompanyComponents/ButtonTable';
import PopupEditC from '@/components/CompanyComponents/PopupEditC';
import styles from '@/styles/Componenadm.module.css';
import PopupInsertC from '@/components/CompanyComponents/PopupInsertC';
import RequireAuth from '@/components/UtilsComponents/RequireAuth';

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