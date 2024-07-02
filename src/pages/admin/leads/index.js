import React, { useState, useEffect } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import ButtonTable from '@/components/LeadsComponents/ButtonTable';
import styles from '@/styles/leads.module.css';

const Leads = () => {
  const [lead, setLead] = useState([]);
  // console.log(lead);

  useEffect(() => {
    fetch('http://localhost:8000/leads/')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched leads:', data);
        setLead(data.leads); // Accede a la propiedad leads en la respuesta
      })
      .catch(error => console.error('Error fetching leads:', error));
  }, []);

  return (
    <LayoutAdmin>
      <h1 className="text-xl font-bold mb-6">Prospectos</h1>
      <div className="flex space-x-4 p-4">
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
        {/* Segundo input */}
        <div className="w-1/2">
          <input
            type="text"
            id="second-input"
            name="second-input"
            placeholder="Second Input"
            className="mt-1 block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />
        </div>
        {/* Botón */}
        <div className="w-1/6 flex items-end">
          <button className="mt-1 block w-full rounded-md bg-black text-white py-2 px-4">
            Agregar
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th className="text-center">Nombre</th>
            <th className="text-center">Teléfono</th>
            <th className="text-center">Correo Electrónico</th>
            <th className="text-center">Estado</th>
            <th className="text-center">Ciudad</th>
            <th className="text-center">Fuente</th>
            <th className="text-center">Interés</th>
            <th className="text-center">Mensaje</th>
            <th className="text-center">Status</th>
            <th className="text-center">Compañía</th>
            <th className="text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(lead) && lead.length > 0 ? (
            lead.map(leadItem => (
              <tr key={leadItem.id}>
                <td>{leadItem.id}</td>
                <td>{leadItem.name}</td>
                <td>{leadItem.phone}</td>
                <td>{leadItem.mail}</td>
                <td>{leadItem.state}</td>
                <td>{leadItem.city}</td>
                <td>{leadItem.source}</td>
                <td>{leadItem.interest}</td>
                <td>{leadItem.message}</td>
                <td>{leadItem.status}</td>
                <td>{leadItem.company_name}</td>
                <td>
                  <ButtonTable />
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

