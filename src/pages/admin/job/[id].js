import React, { useState, useEffect } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import useSWR from 'swr';
import { useRouter } from 'next/router';

const fetcher = (url) => fetch(url).then((res) => res.json());

const JobOffer = () => {
  const router = useRouter();
  const id = router.query.id
  const { data, error } = useSWR(`http://localhost:8000/vacancies/${id}`, fetcher);
  console.log(data)
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
      console.log(data)
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
    try {
      const response = await fetch('http://localhost:8000/api/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        console.log('Formulario enviado:', form);
        router.push('job/gracias'); // Redirige a la página de agradecimiento
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
    <LayoutAdmin>
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto mt-10">

        {console.log(vacancies)}
        {vacancies.map((vacancy) => (
          <div key={vacancy.id} className="mb-10">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{vacancy.title}</h1>
                <p className="text-gray-500">{vacancy.state}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-800 font-bold text-xl">{vacancy.salary} (Mensual)</p>
                <p className="text-gray-500">{vacancy.type}</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-800 font-bold text-xl">Descripción del Puesto:</p>
              <p className="text-gray-500">{vacancy.description}</p>
            </div>
            <div className="mb-10">
              <p className="text-gray-800 font-bold text-xl">Requerimientos:</p>
              <p className="text-gray-500">{vacancy.requirements}</p>
            </div>
          </div>
        ))}
        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Nombre</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Teléfono</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Dirección</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition duration-300">¡POSTÚLATE!</button>
          </form>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default JobOffer;
