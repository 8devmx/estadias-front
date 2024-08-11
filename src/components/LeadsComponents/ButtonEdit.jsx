import React, { useState, useEffect } from 'react';
import { PiNotMemberOfBold } from 'react-icons/pi';

const ButtonEdit = ({ leadId, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    mail: '',
    state: '',
    city: '',
    source: '',
    interest: '',
    company_id: '',
    status_id: '',
    name_client: '' 
  });

  const [messageClient, setMessageClient] = useState('');
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_KEY}/leads/${leadId}`, {
      headers: getAuthHeaders(),
    })
      .then(response => response.json())
      .then(data => {
        setFormData(data);
      })
      .catch(error => console.error('Error fetching lead data:', error));

    fetch(`${process.env.NEXT_PUBLIC_API_KEY}/status`, {
      headers: getAuthHeaders(),
    })
      .then(response => response.json())
      .then(data => {
        if (data.Status) {
          setStatuses(data.Status);
        } else {
          console.error('Invalid status data format:', data);
        }
      })
      .catch(error => console.error('Error fetching statuses:', error));
  }, [leadId]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleMessageChange = (e) => {
    setMessageClient(e.target.value);
  };

  const handleUpdateLead = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_KEY}/leads/${leadId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Lead updated successfully:', data);
        handleCreateHistorial();
      })
      .catch(error => {
        console.error('Error updating lead:', error);
      });
  };

  const handleCreateHistorial = () => {
    const historialData = {
      ...formData,
      leadId,
      message_client: messageClient,
      name_client: formData.name_client // Asegúrate de que este campo se incluya en los datos enviados
    };

    fetch(`${process.env.NEXT_PUBLIC_API_KEY}/leads_historial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(historialData),
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(data => {
        console.log('Historial created successfully:', data);
        onClose();
      })
      .catch(error => {
        console.error('Error creating historial:', error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateLead();
  };

  return (
    <dialog open className="modal modal-open">
      <div className="modal-box">
        <form onSubmit={handleSubmit}>
          <button type="button" onClick={onClose} className="text-customBlak btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <center>
            <h3 className="text-customBlak font-bold text-lg">Editar!</h3>
          </center>
          <br />
          <div>
            <div className='flex gap-1'>
              <label className="w-1/2 text-gray-400 input input-bordered flex items-center gap-2">
                <input type="text" name="name" className="grow" value={formData.name} onChange={handleChange} placeholder="Jose" readOnly />
              </label>
              <label className="w-1/2 text-gray-400 input input-bordered flex items-center gap-2">
                <input type="text" name="state" className="grow" value={formData.state} onChange={handleChange} placeholder="Quintana Roo" readOnly />
              </label>
            </div>
            <br />
            <div>
              <div className='flex gap-1'>
                <label className="w-1/2 text-customBlak input input-bordered flex items-center gap-2">
                  <input type="text" name="mail" className="grow" value={formData.mail} onChange={handleChange} placeholder="mail@gmal.com" />
                </label>
                <label className="w-1/2 text-customBlak input input-bordered flex items-center gap-2">
                  <input type="text" name="phone" className="grow" value={formData.phone} onChange={handleChange} placeholder="99800000" />
                </label>
              </div>
            </div>
            <br />
            <div>
              <div className='flex gap-1'>
                <label className="w-1/2 text-gray-400 input input-bordered flex items-center gap-2">
                  <input type="text" name="city" className="grow" value={formData.city} onChange={handleChange} placeholder="Ciudad" readOnly />
                </label>
                <label className="w-1/2 text-gray-400 input input-bordered flex items-center gap-2">
                  <input type="text" name="source" className="grow" value={formData.source} onChange={handleChange} placeholder="direccion" readOnly />
                </label>
              </div>
            </div>
            <br />
            <div>
            <div className='flex gap-1'>
            <label className="w-1/2 text-customBlak input input-bordered flex items-center gap-2">
              <select
                name="interest"
                className="select-xs select-ghost w-full max-w-xs"
                value={formData.interest}
                onChange={handleChange} 
              >
                <option value="" disabled={!formData.interest}>Seleccione una opción</option>
                <option value="Informes">Informes</option>
                <option value="Vacantes">Vacantes</option>
                <option value="Productos/Servicios">Productos/Servicios</option>
                <option value="Quiero Postularme">Quiero Postularme</option>
              </select>
            </label>
            <label className="w-1/2 text-customBlak input input-bordered flex items-center gap-2">
              <select
                name="status_id"
                className="select-xs select-ghost w-full max-w-xs"
                value={formData.status_id}
                onChange={handleChange}
              >
                <option value="">Seleccione un estado</option>
                {Array.isArray(statuses) && statuses.map(status => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
            </div>
            <br />
            <div>
              <h3 className='pt-2 pb-2 text-center font-bold text-customBlak'>Acciones del contactador</h3>
            </div>
            <label className="text-customBlak input input-bordered flex items-center gap-2">
              <input type="text" name="name_client" className="grow" value={formData.name_client} onChange={handleChange} placeholder="Nombre del contactador" />
            </label>
            <br />
              <textarea
                name="message"
                value={messageClient}
                onChange={handleMessageChange}
                placeholder="Mensaje del contactador"
                className="textarea textarea-bordered textarea-md w-full max-w"
              ></textarea>
            <br />
            <br />
            <center>
              <button type="submit" className="btn btn-outline btn-wide btn-accent h-5">Guardar</button>
            </center>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ButtonEdit;
