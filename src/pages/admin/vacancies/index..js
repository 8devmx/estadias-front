import React from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import Vacancies from '@/services/vacancies';
import useSWR from 'swr';
import ButtonTable from '@/components/VacanciesComponents/ButtonTable';
import styles from '@/styles/Componenadm.module.css';

const fetcher = async url => {
  const data = await Vacancies();
  return data.data.vacancies;
}

const Vacanciedata = () => {
  const { data, error, isLoading } = useSWR('http://localhost:8000/vacancies', fetcher);
  // console.log(data);  verificar primero que data tenga los datos que trae Candidates del services
  if (error) return <div>Error al cargar</div>;
  if (isLoading) return <div>Cargando...</div>;

  return (
    <LayoutAdmin>
      <h1 className="text-xl font-bold mb-6">Vacantes</h1>
      <div className="flex justify-between p-4">
        {/* Primer input */}
        <div className="w-1/2">
          <input
            type="text"
            id={styles.input}
            name="first-input"
            placeholder="Buscar"
            className="mt-1 block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />
        </div>
        {/* Botón */}
        <div className="w-1/6 flex items-end">
          <button className="mt-1 block w-full rounded-md bg-black text-white py-2 px-4">
            Agregar
          </button>
        </div>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Estado</th>
            <th>Categoria</th>
            <th>Titulo</th>
            <th>Compania</th>
            <th>Descripción</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vacancie, index) => (
            <tr key={index} className="hover">
              <th>{vacancie.id}</th>
              <td>{vacancie.state}</td>
              <td>{vacancie.category}</td>
              <td>{vacancie.title}</td>
              <td>{vacancie.company_id}</td>
              <td>{vacancie.description}</td>
              <td>{vacancie.type}</td>
              <td>
                  <ButtonTable />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </LayoutAdmin>
  );
}

export default Vacanciedata;