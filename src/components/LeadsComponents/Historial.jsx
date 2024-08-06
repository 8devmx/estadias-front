import React, { useState, useEffect } from 'react';

const Historial = ({ leadName }) => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_KEY}/leads_historial`, {
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
    } else if (status_name === 'Le intereso') {
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
            <th>Situación</th>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Mail</th>
            <th>Estado</th>
            <th>Ciudad</th>
            <th>Dirección</th>
            <th>Interés</th>
            <th>Mensaje</th>
            <th>Compañía</th>
            <th>Contactador</th>
            <th>Mensag contact</th>
            <th>Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          {filteredHistorial.length > 0 ? (
            filteredHistorial.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <span className={getStatusClass(item.status_name)}>
                    {renderCellContent(item.status_name)}
                  </span>
                </td>
                <td>{renderCellContent(item.name)}</td>
                <td>{renderCellContent(item.phone)}</td>
                <td>{renderCellContent(item.mail)}</td>
                <td>{renderCellContent(item.state)}</td>
                <td>{renderCellContent(item.city)}</td>
                <td>{renderCellContent(item.source)}</td>
                <td>{renderCellContent(item.interest)}</td>
                <td>{renderCellContent(item.message)}</td>
                <td>{renderCellContent(item.company_name)}</td>
                <td>{renderCellContent(item.name_client)}</td>
                <td>{renderCellContent(item.message_client)}</td>
                <th className='text-center'>{renderCellContent(item.created_at)}</th>
              </tr>
            ))
          ) : (
            <td colSpan="13">
              <div role="alert" className="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Warning: No se ha creado historial!</span>
              </div>
              </td>
            // <tr>
            //   <td colSpan="13">No se ha creado historial</td>
            // </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Historial;

