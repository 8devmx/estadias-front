import React, { useState, useEffect } from 'react';
import Historial from "./Historial";
import Acciones from './Acciones';

const ModalDetails = ({ leadId, onClose }) => {
  const [lead, setLead] = useState(null);
  const [state, setState] = useState('');
  const [nameClient, setNameClient] = useState('');

  useEffect(() => {
    if (leadId) {
      fetch(`http://localhost:8000/leads/${leadId}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched lead:', data);
          setLead(data);
        })
        .catch(error => console.error('Error fetching lead:', error));
    }
  }, [leadId]);

  const handleSaveToHistorial = () => {
    if (lead) {
      const historialData = {
        ...lead,
        state, 
        name_client: nameClient, 
      };

      fetch('http://localhost:8000/leads_historial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
        </form>
        <center>
          <h3 className="font-bold text-lg">Detalles!</h3>
        </center>
        {lead ? (
          <div>
            <div className='flex'>
              <p className="py-4 font-bold w-1/2 flex">Nombre:
                <span className='font-normal ml-1'> {lead.name}</span>
              </p>
              <p className="py-4 font-bold w-1/2 flex">Teléfono:
                <span className='font-normal ml-1'>{lead.phone}</span>
              </p>
            </div>
            <div className='flex'>
              <p className="py-4 font-bold w-1/2 flex">Correo:
                <span className='font-normal ml-1'>{lead.mail}</span> 
              </p>
              <p className="py-4 font-bold w-1/2 flex">Estado:
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
              <p className="py-4 font-bold w-1/2 flex">Interés:
                <span className='font-normal ml-1'>{lead.interest}</span>
              </p>
              {/* <p className="py-4 font-bold w-1/2 flex">Compañía:
                <span className='font-normal ml-1'>{lead.company_name}</span>
              </p> */}
              <p className="py-4 font-bold w-1/2 flex">Situacion:
                <span className='font-normal ml-1'>{lead.status}</span>
              </p>
            </div>
            <div>
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
