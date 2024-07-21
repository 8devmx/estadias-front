import React, { useState, useEffect } from 'react';

const RegistrosHistorial = () => {
  const [historial, setHistorial] = useState([]);

  const fetchHistorial = async () => {
    try {
      const response = await fetch('http://localhost:8000/leads_historial');
      const data = await response.json();
      setHistorial(data.leads || []);
    } catch (error) {
      console.error('Error fetching historial:', error);
    }
  };

  useEffect(() => {
    // Fetch historial on component mount
    fetchHistorial();

    // Set up interval to fetch historial every 10 seconds
    const interval = setInterval(() => {
      fetchHistorial();
    }, 10000); // 10000ms = 10s

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <dialog id="my_modal_3" className="modal modal-midel">
      <div className="modal-box w-full max-w-custom h-3/6">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div className="overflow-x-auto">
          <div>
            <h3 className='text-center flix pb-2 text-customBlak font-bold text-lg'>Registro del Historial</h3>
          </div>
          <table className="table table-xs">
            <thead>
              <tr>
                <th className='text-customBlak'>#</th>
                <th className='text-customBlak'>Cliente</th>
                <th className='text-customBlak'>Teléfono</th>
                <th className='text-customBlak'>Mail</th>
                <th className='text-customBlak'>Situación</th>
                <th className='text-customBlak'>Estado</th>
                <th className='text-customBlak'>Ciudad</th>
                <th className='text-customBlak'>Dirección</th>
                <th className='text-customBlak'>Interés</th>
                <th className='text-customBlak'>Mensaje</th>
                <th className='text-customBlak'>Compañía</th>
                <th className='text-customBlak'>Contactador</th>
                <th className='text-customBlak'>Fecha de creación</th>
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
                    <td>{item.status_name}</td>
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
