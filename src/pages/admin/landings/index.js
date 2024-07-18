import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LayoutAdmin from '@/components/LayoutAdmin';
import { FaTrashAlt, FaPen } from "react-icons/fa";

const Landings = () => {
  const [landings, setLandings] = useState([]);
  const [editLanding, setEditLanding] = useState(null); 

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/landings');
      if (response.data && response.data.landings && Array.isArray(response.data.landings)) {
        setLandings(response.data.landings);
      } else {
        console.error('Data received is not in the expected format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteLanding = async (id) => {
    try {
      const response = await axios.delete (`http://localhost:8000/landings/${id}`);
      console.log(response.data); 
      setLandings(landings.filter(landing => landing.id !== id));
    } catch (error) {
      console.error('Error deleting landing:', error);
    }
  };

  const handleEditLanding = (landing) => {
    setEditLanding(landing); 
  };

  const handleUpdateLanding = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/landings/${editLanding.id}`, editLanding);
      console.log(response.data);
      setEditLanding(null);
      fetchData(); 
    } catch (error) {
      console.error('Error updating landing:', error);
    }
  };

  const handleChange = (e) => {
    setEditLanding({ ...editLanding, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <LayoutAdmin>
        <h1 className="text-xl font-bold mb-6">Landings</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Hero</th>
              <th>Services</th>
              <th>Packages</th>
              <th>Company_id</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {landings.map(landing => (
              <tr key={landing.id}>
                <td>{landing.id}</td>
                <td>{landing.hero}</td>
                <td>{landing.services}</td>
                <td>{landing.packages}</td>
                <td>{landing.company_id}</td>
                <td>
                  <div className="flex space-x-1 p-1">
                    <div className="w-1/2 flex">
                      <button
                        className="mt-1 block w-full rounded-md bg-green-500 text-white py-2 px-2 flex items-center justify-center"
                        onClick={() => handleEditLanding(landing)}
                      >
                        <FaPen />
                      </button>
                    </div>
                    <div className="w-1/2 flex">
                      <button
                        className="mt-1 block w-full rounded-md bg-red-500 text-white py-2 px-2 flex items-center justify-center"
                        onClick={() => deleteLanding(landing.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Formulario de Edición */}
        {editLanding && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Edit Landing</h2>
            <div className="mb-4">
              <input
                type="text"
                name="hero"
                value={editLanding.hero}
                onChange={handleChange}
                placeholder="Hero"
                className="border-gray-300 border rounded-md p-2 mr-2 w-full h-16 mb-4"
              />
              <input
                type="text"
                name="services"
                value={editLanding.services}
                onChange={handleChange}
                placeholder="Services"
                className="border-gray-300 border rounded-md p-2 mr-2 w-full h-16 mb-4"
              />
              <input
                type="text"
                name="packages"
                value={editLanding.packages}
                onChange={handleChange}
                placeholder="Packages"
                className="border-gray-300 border rounded-md p-2 mr-2 w-full h-16 mb-4"
              />
              <input
                type="number"
                name="company_id"
                value={editLanding.company_id}
                onChange={handleChange}
                placeholder="Company ID"
                className="border-gray-300 border rounded-md p-2 mr-2 mb-4"
              />
              <br/>
              <button
                onClick={handleUpdateLanding}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8">
                Update Landing
              </button>
            </div>
          </div>
        )}
      </LayoutAdmin>
    </div>
  );
};

export default Landings;