import React, { useState, useEffect } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import ButtonTable from '@/components/LeadsComponents/ButtonTAble';
import RegistrosHistorial from '@/components/LeadsComponents/RegistrosHistorial';
import styles from '@/styles/leads.module.css';

const Leads = () => {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const response = await fetch('http://localhost:8000/leads/');
      const data = await response.json();
      setLeads(data.leads);
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  // para hacer intervalos de actualizacion cada 10 seg
  useEffect(() => { 
    fetchLeads();

    const interval = setInterval(() => {
      fetchLeads();
    }, 10000); // 10000ms = 10s

    return () => clearInterval(interval);
  }, []);

  const handleDeleteLead = async (leadId) => {
    try {
      const response = await fetch(`http://localhost:8000/leads/${leadId}`, {
        method: 'DELETE',
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

  return (
    <LayoutAdmin>
      <h1 className="text-xl font-bold mb-6">Prospectos</h1>
      <div className="flex space-x-4 p-4">
        {/* Primer input */}
        <div className="w-1/2">
          {/* <input
            type="text"
            id={styles.input}
            name="first-input"
            placeholder="Buscar"
            className="mt-1 block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          /> */}
        </div>
        {/* Segundo input */}
        <div className="w-1/2">
          {/* <input
            type="text"
            id="second-input"
            name="second-input"
            placeholder="Second Input"
            className="mt-1 block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          /> */}
        </div>
        {/* Botón */}
        <div className="w-1/6 flex justify-end">
          <button onClick={() => document.getElementById('my_modal_3').showModal()} className="mt-1 block w-full rounded-md bg-black text-white py-2 px-4">
            registros del historial
          </button>
          <RegistrosHistorial />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
            {/* <th className="text-center">Estado</th> */}
            {/* <th className="text-center">Ciudad</th> */}
            {/* <th className="text-center">Fuente</th> */}
            <th>Interés</th>
            {/* <th className="text-center">Mensaje</th> */}
            <th>Status</th>
            <th>Compañía</th>
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
                {/* <td>{leadItem.state}</td> */}
                {/* <td>{leadItem.city}</td> */}
                {/* <td>{leadItem.source}</td> */}
                <td>{leadItem.interest}</td>
                {/* <td>{leadItem.message}</td> */}
                <td>{leadItem.status_name}</td>
                <td>{leadItem.company_name}</td>
                <td>
                  <ButtonTable leadId={leadItem.id} onDelete={handleDeleteLead} />
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
    </LayoutAdmin>
  );
}

export default Leads;
