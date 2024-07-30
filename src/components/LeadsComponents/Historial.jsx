import React, { useState, useEffect } from 'react';

const Historial = ({ leadName }) => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/leads_historial', {
      headers: getAuthHeaders(),
    })
      .then(response => response.json())
      .then(data => {
        setHistorial(data.leads || []);
      })
      .catch(error => console.error('Error fetching historial:', error));
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const filteredHistorial = historial.filter(item => item.name.trim() === leadName.trim());

  const renderCellContent = (content) => {
    return content === null ? <span className="text-red-500">---</span> : content;
  };

  const getStatusClass = (status_name) => {
    if (status_name === 'no contactado') {
      return 'text-red-500';
    } else if (status_name === 'contactado') {
      return 'text-green-500';
    } else {
      return 'text-blue-500';
    }
  };

  return (
    <div className='overflow-x-auto'>
      <table className='table table-xs table-pin-rows table-pin-cols'>
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Mail</th>
            <th>Situación</th>
            <th>Estado</th>
            <th>Ciudad</th>
            <th>Dirección</th>
            <th>Interés</th>
            <th>Mensaje</th>
            <th>Compañía</th>
            <th>Contactador</th>
            <th>Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistorial.length > 0 ? (
            filteredHistorial.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{renderCellContent(item.name)}</td>
                <td>{renderCellContent(item.phone)}</td>
                <td>{renderCellContent(item.mail)}</td>
                <td>
                  <span className={getStatusClass(item.status_name)}>
                    {renderCellContent(item.status_name)}
                  </span>
                </td>
                <td>{renderCellContent(item.state)}</td>
                <td>{renderCellContent(item.city)}</td>
                <td>{renderCellContent(item.source)}</td>
                <td>{renderCellContent(item.interest)}</td>
                <td>{renderCellContent(item.message)}</td>
                <td>{renderCellContent(item.company_name)}</td>
                <td>{renderCellContent(item.name_client)}</td>
                <th className='text-center'>{renderCellContent(item.created_at)}</th>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13">No se ha creado historial</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Historial;

