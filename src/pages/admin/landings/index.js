import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LayoutAdmin from '@/components/LayoutAdmin';
import { FaTrashAlt, FaPen } from "react-icons/fa";

const Landings = () => {
  const [landings, setLandings] = useState([]);

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
      const response = await axios.delete(`http://localhost:8000/landings/${id}`);
      console.log(response.data);
      setLandings(landings.filter(landing => landing.id !== id));
    } catch (error) {
      console.error('Error deleting landing:', error);
    }
  };

  return (
    <div>
      <LayoutAdmin>
        <h1 className="text-xl font-bold mb-6">Landings</h1>
        <div className="w-1/6 flex items-end">
          <button className="mt-1 block w-full rounded-md bg-black text-white py-2 px-4">
            Agregar
          </button>
        </div>
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
                      <button className="mt-1 block w-full rounded-md bg-green-500 text-white py-2 px-2 flex items-center justify-center ">
                        <FaPen />
                      </button>
                    </div>
                    <div className="w-1/2 flex">
                      <button className="mt-1 block w-full rounded-md bg-red-500 text-white py-2 px-2 flex items-center justify-center" onClick={() => deleteLanding(landing.id)}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </LayoutAdmin>
    </div>
  );
};

export default Landings;
