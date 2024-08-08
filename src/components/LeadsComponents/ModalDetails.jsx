import React, { useState, useEffect } from 'react';
import Historial from "./Historial";

const ModalDetails = ({ leadId, onClose }) => {
  const [lead, setLead] = useState(null);
  const [state, setState] = useState('');
  const [nameClient, setNameClient] = useState('');

  useEffect(() => {
    if (leadId) {
      fetch(`${process.env.NEXT_PUBLIC_API_KEY}/leads/${leadId}`, {
        headers: getAuthHeaders(),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Fetched lead:', data);
          setLead(data);
        })
        .catch(error => console.error('Error fetching lead:', error));
    }
  }, [leadId]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleSaveToHistorial = () => {
    if (lead) {
      const historialData = {
        ...lead,
        state,
        name_client: nameClient,
      };

      fetch(`${process.env.NEXT_PUBLIC_API_KEY}/leads_historial`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(), // Agregar encabezado de autorización aquí
        },
        body: JSON.stringify(historialData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Saved to historial:', data);
        })
        .catch(error => console.error('Error saving to historial:', error));
    }
  };

  return (
    <dialog id="my_modal_3" className="modal modal-open" open={!!leadId}>
      <div className="modal-box w-full max-w-Modal50 h-3/6">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
        </form>
        <center>
          <h3 className="font-bold text-lg">Detalles!</h3>
        </center>
        {lead ? (
          <div>
            <div className='flex'>
              <p className="py-4 font-bold w-1/3 flex">Nombre:
                <span className='font-normal ml-1'> {lead.name}</span>
              </p>
              <p className="py-4 font-bold w-1/3 flex">Teléfono:
                <span className='font-normal ml-1'>{lead.phone}</span>
              </p>
              <p className="py-4 font-bold w-1/3 flex">Correo:
                <span className='font-normal ml-1'>{lead.mail}</span> 
              </p>
            </div>

            <div className='flex'>
              <p className='py-4 font-bold w-1/3 flex'>Compañia:
                <span className='font-normal ml-1'>{lead.company_name}</span>
              </p>
              <p className="py-4 font-bold w-1/3 flex">Situación:
                <span className='font-normal ml-1'>{lead.status_name}</span>
              </p>
              <p className="py-4 font-bold w-1/3 flex">Estado:
                <span className='font-normal ml-1'>{lead.state}</span>
              </p>
            </div>
            <div className='flex'>
              <p className="py-4 font-bold w-1/2 flex">Ciudad:
                <span className='font-normal ml-1'>{lead.city}</span>
              </p>
              <p className="py-4 font-bold w-1/2 flex">Referencia:
                <span className='font-normal ml-1'>{lead.source}</span>
              </p>
            </div>
            <div className='flex'>
            </div>
            <div>
              <p className="py-4 font-bold  flex">Interés:
                <span className='font-normal ml-1'>{lead.interest}</span>
              </p>
            </div>
            <div className='flex'>
              <p className="py-4 font-bold flex">Comentarios:
                <span className='font-normal ml-1'>{lead.message}</span>
              </p>
            </div>
            <hr />
          </div>
        ) : (
          <h3 className='font-bold text-lg'>No lead available!</h3>
        )}
        <div>
          {/* <center>
            <h3 className="font-bold text-lg">Acciones!</h3>
          </center>
          <Acciones 
            onStateChange={(value) => setState(value)} 
            onNameClientChange={(value) => setNameClient(value)} 
            onSubmit={handleSaveToHistorial}
          /> */}
          {/* <hr /> */}
          <center>
            <h3 className="font-bold text-lg">Historial!</h3>
          </center>
          {lead && <Historial leadName={lead.name} />}
        </div>
      </div>
    </dialog>
  );
};

export default ModalDetails;
