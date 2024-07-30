import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const fetcher = (url) => fetch(url).then((res) => res.json());

const JobOffer = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data, error } = useSWR(`http://localhost:8000/vacancies/${id}`, fetcher);
  const [vacancies, setVacancies] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    if (data) {
      setVacancies(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.address) {
      Swal.fire({
        icon: 'warning',
        title: 'Lo siento...',
        text: 'Todos los campos son obligatorios',
        confirmButtonColor: '#e67e22 ',
        confirmButtonText: 'Regresar'
      });
      return;
    }
    try {
      const response = await fetch('http://localhost:8000/candidates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const responseData = await response.json();
        const createdId = responseData.id; // Acceder al ID correctamente
        router.push(`/job/gracias?id=${createdId}`);
      } else {
        console.error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  if (error) return <div className="text-red-500">Error al cargar</div>;
  if (!data) return <div className="text-blue-500">Cargando...</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-6xl mx-auto mt-10 flex">
      <div className="flex-1 pr-8">
        {vacancies.map(vacancy => (
          <div key={vacancy.id}>
            <h2 className="text-2xl font-bold mb-4">{vacancy.title}</h2>
            <p className="text-gray-700">{vacancy.description}</p>
          </div>
        ))}
      </div>
      <div className="flex-1">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700 font-semibold">Nombre:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 font-semibold">Teléfono:</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 font-semibold">Dirección:</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 rounded-full hover:shadow-lg transition duration-300">¡POSTÚLATE AQUÍ!</button>
        </form>
      </div>
    </div>
  );
};

export default JobOffer;
