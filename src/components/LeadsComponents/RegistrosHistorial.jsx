import React, { useState, useEffect } from 'react';

const RegistrosHistorial = () => {
  const [historial, setHistorial] = useState([]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchHistorial = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/leads_historial`, {
        headers: getAuthHeaders(), // Agregar encabezado de autorización aquí
      });
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
    <dialog id="my_modal_3" className="modal modal-midel">
      <div className="modal-box w-full max-w-Modal70 h-3/6">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div className="overflow-x-auto">
          <div>
            <h3 className='text-center flex pb-2 text-customBlak font-bold text-lg'>Registro del Historial</h3>
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
                <th className='text-customBlak'>Mensaje contactador</th>
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
                    <td className={getStatusClass(item.status_name)}>{item.status_name}</td>
                    <td>{item.city}</td>
                    <td>{item.source}</td>
                    <td>{item.interest}</td>
                    <td>{item.message}</td>
                    <td>{item.company_name}</td>
                    <td>{item.name_client || '---'}</td>
                    <td>{item.message_client || '---'}</td>
                    <td>{item.created_at}</td>
                  </tr>
                ))
              ) : (
                <tr>
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
                      <span>Warning: No hay historial disponible!</span>
                    </div>
                  </td>
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
