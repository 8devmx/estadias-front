import React, { useState, useEffect } from 'react';

const RegistrosHistorial = () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/leads_historial')
      .then(response => response.json())
      .then(data => {
        setHistorial(data.leads || []);
      })
      .catch(error => console.error('Error fetching historial:', error));
  }, []);

  return (
    <dialog id="my_modal_3" className="modal modal-midel">
      <div className="modal-box w-full max-w-custom h-3/6">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div className="overflow-x-auto">
          <table className="table table-xs">
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
              {historial.length > 0 ? (
                historial.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.mail}</td>
                    <td>{item.state}</td>
                    <td>{item.status}</td>
                    <td>{item.city}</td>
                    <td>{item.source}</td>
                    <td>{item.interest}</td>
                    <td>{item.message}</td>
                    <td>{item.company_name}</td>
                    <td>{item.name_client || '---'}</td>
                    <td>{item.created_at}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13">No hay historiales disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
};

export default RegistrosHistorial;
