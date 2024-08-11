import React, { useState, useEffect } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import ButtonTable from '@/components/LeadsComponents/ButtonTAble';
import RegistrosHistorial from '@/components/LeadsComponents/RegistrosHistorial';
import RequireAuth from '@/components/UtilsComponents/RequireAuth';
import TableWithCompanyCheck from '@/components/UtilsComponents/TableWithCompanyCheck';

const Leads = () => {
  const [leads, setLeads] = useState([]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchLeads = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/leads`, { headers: getAuthHeaders() });
      const data = await response.json();
      setLeads(data.leads);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  useEffect(() => {
    fetchLeads();

    const interval = setInterval(() => {
      fetchLeads();
    }, 10000); // 10000ms = 10s

    return () => clearInterval(interval);
  }, []);

  const handleDeleteLead = async (leadId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/leads/${leadId}`, {
        method: 'DELETE', headers: getAuthHeaders(),
      });
      if (response.ok) {
        setLeads(leads.filter(lead => lead.id !== leadId));
      } else {   
        console.error('Error deleting lead:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const getStatusClass = (status_name) => {
    if (status_name === 'no contactado') {
      return 'text-red-500';
    } else if (status_name === 'Le intereso') {
      return 'text-green-500';
    } else {
      return 'text-blue-500';
    }
  };

  return (
    <LayoutAdmin>
      <RequireAuth />
      <h1 className="text-xl font-bold mb-6">Prospectos</h1>
      <div className="flex space-x-4 p-4">
        <div className="w-1/6 flex justify-end">
          <button onClick={() => document.getElementById('my_modal_3').showModal()} className="mt-1 block w-full rounded-md bg-black text-white py-2 px-4">
            Registros del historial
          </button>
          <RegistrosHistorial />
        </div>
      </div>

      {/* Aquí envolvemos la tabla en el componente TableWithCompanyCheck */}
      <TableWithCompanyCheck>
        <TableContent 
          leads={leads} 
          getStatusClass={getStatusClass} 
          handleDeleteLead={handleDeleteLead} 
        />
      </TableWithCompanyCheck>
    </LayoutAdmin>
  );
}

const TableContent = ({ leads, getStatusClass, handleDeleteLead, showCompanyColumn }) => (
  <table className="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Teléfono</th>
        <th>Correo Electrónico</th>
        <th>Interés</th>
        <th>Status</th>
        {showCompanyColumn && <th>Compañía</th>}
        <th className='text-center'>Acción</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(leads) && leads.length > 0 ? (
        leads.map(leadItem => (
          <tr key={leadItem.id}>
            <td>{leadItem.id}</td>
            <td>{leadItem.name}</td>
            <td>{leadItem.phone}</td>
            <td>{leadItem.mail}</td>
            <td>{leadItem.interest}</td>
            <td className={getStatusClass(leadItem.status_name)}>{leadItem.status_name}</td>
            {showCompanyColumn && <td>{leadItem.company_name}</td>}
            <td>
              <ButtonTable leadId={leadItem.id} onDelete={() => handleDeleteLead(leadItem.id)} />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="12">No leads available</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default Leads;
