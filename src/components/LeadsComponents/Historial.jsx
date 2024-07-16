import React, { useState, useEffect } from 'react';

const Historial = ({ leadName }) => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/leads_historial')
      .then(response => response.json())
      .then(data => {
        setHistorial(data.leads || []);
      })
      .catch(error => console.error('Error fetching historial:', error));
  }, []);

  const filteredHistorial = historial.filter(item => item.name.trim() === leadName.trim());

  const renderCellContent = (content) => {
    return content === null ? <span className="text-red-500">---</span> : content;
  };

  const getStatusClass = (status) => {
    if (status === 'no contactado') {
      return 'text-red-500';
    } else if (status === 'contactado') {
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
            <th>cliente</th>
            <th>telefono</th>
            <th>mail</th>
            <th>situacion</th>
            <th>Estado</th>
            <th>city</th>
            <th>direccion</th>
            <th>interes</th>
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
                  <span className={getStatusClass(item.status)}>
                    {renderCellContent(item.status)}
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
              <td colSpan="7">No se ha creado historial</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Historial;
