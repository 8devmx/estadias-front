import React, { useState, useEffect } from 'react';

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
    status: '',
    message: ''
  });

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/leads/${leadId}`)
      .then(response => response.json())
      .then(data => {
        setFormData(data);
      })
      .catch(error => console.error('Error fetching lead data:', error));

    fetch('http://localhost:8000/company')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched companies:', data);
        setCompanies(data.company || []);
      })
      .catch(error => console.error('Error fetching companies:', error));
  }, [leadId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateLead = () => {
    fetch(`http://localhost:8000/leads/${leadId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
    fetch('http://localhost:8000/leads_historial', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, leadId }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Historial created successfully:', data);
      onClose();
    })
    .catch(error => {
      console.error('Error creating historial:', error);
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
          <h3 className="text-customBlak font-bold text-lg">Editar!</h3>
          <div>
            <div className='flex gap-1'>
              <label className="w-1/2 text-customBlak input input-bordered flex items-center gap-2">
                <input type="text" name="name" className="grow" value={formData.name} onChange={handleChange} placeholder="Jose" />
              </label>
              <label className="w-1/2 text-customBlak input input-bordered flex items-center gap-2">
                <input type="text" name="phone" className="grow" value={formData.phone} onChange={handleChange} placeholder="99800000" />
              </label>
            </div>
            <br />
            <div>
              <div className='flex gap-1'>
                <label className="w-1/2 text-customBlak input input-bordered flex items-center gap-2">
                  <input type="text" name="mail" className="grow" value={formData.mail} onChange={handleChange} placeholder="mail@gmal.com" />
                </label>
                <label className="w-1/2 text-customBlak input input-bordered flex items-center gap-2">
                  <input type="text" name="state" className="grow" value={formData.state} onChange={handleChange} placeholder="Quintana Roo" />
                </label>
              </div>
            </div>
            <br />
            <div>
              <div className='flex gap-1'>
                <label className="w-1/2 text-customBlak input input-bordered flex items-center gap-2">
                  <input type="text" name="city" className="grow" value={formData.city} onChange={handleChange} placeholder="Ciudad" />
                </label>
                <label className="w-1/2 text-customBlak input input-bordered flex items-center gap-2">
                  <input type="text" name="source" className="grow" value={formData.source} onChange={handleChange} placeholder="direccion" />
                </label>
              </div>
            </div>
            <br />
            <div>
              <div className='flex gap-1'>
                <label className="w-1/2 text-customBlak input input-bordered flex items-center gap-2">
                  <input type="text" name="interest" className="grow" value={formData.interest} onChange={handleChange} placeholder="Interés" />
                </label>
                <label className="w-1/2 text-customBlak input input-bordered flex items-center gap-2">
                  <select
                    name="company_id"
                    className="select-xs select-ghost w-full max-w-xs"
                    value={formData.company_id}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione una compañía</option>
                    {Array.isArray(companies) && companies.map(company => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <br />
            <div>
              <label className="text-customBlak input input-bordered flex items-center gap-2">
                <input type="text" name="status" className="grow" value={formData.status} onChange={handleChange} placeholder="No contactado" />
              </label>
            </div>
            <br />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Mensaje"
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





