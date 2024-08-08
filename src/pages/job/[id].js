import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const fetcher = (url) => fetch(url).then((res) => res.json());

const JobOffer = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_KEY}/vacancies1/${id}`, fetcher);
  const [vacancies, setVacancies] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    company_id: '2'
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
        confirmButtonColor: '#e67e22',
        confirmButtonText: 'Regresar'
      });
      return;
    }
    try {
      console.log('Enviando datos del formulario:', form); // Debugging

      // const response = await fetch('http://localhost:8000/candidatesfront', {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/candidatesfront`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        const responseData = await response.json(); // Obtiene los datos de la respuesta
        const newId = responseData.id; // Obtiene el id del candidato recién creado
        console.log('Formulario enviado:', form);
        router.push(`/job/gracias?id=${newId}`); // Redirige a la página de gracias con el id
      } else {
        console.error('Error al enviar el formulario');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar el formulario. Por favor, inténtelo de nuevo más tarde.',
        });
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar el formulario. Por favor, inténtelo de nuevo más tarde.',
      });
    }
  };

  if (error) return <div className="text-red-500">Error al cargar</div>;
  if (!data) return <div className="text-blue-500">Cargando...</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-6xl mx-auto mt-10 flex">
      <div className="flex-1 pr-8">
        {vacancies.map((vacancy) => (
          <div key={vacancy.id} className="mb-10">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{vacancy.title}</h1>
                <p className="text-gray-500">Ubicación: {vacancy.state}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-800 font-bold text-xl">{vacancy.salary} (Mensual)</p>
                <p className="text-gray-500">Horario: {vacancy.type}</p>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-800 font-bold text-xl">Descripción del Puesto:</p>
              <ul className="text-gray-500">
                {vacancy.description.split(';').map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            </div>
            <div className="mb-10">
              <p className="text-gray-800 font-bold text-xl">Requerimientos:</p>
              <ul className="text-gray-500">
                {vacancy.requirements ? (
                  vacancy.requirements.split(';').map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))
                ) : (
                  <p>No hay requisitos disponibles</p>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-1/3">
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
            <label className="block text-gray-700 font-semibold">Correo Electrónico:</label>
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
