import React from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import Vacancies from '@/services/vacancies';
import useSWR from 'swr';

const fetcher = async url => {
  const data = await Vacancies();
  return data.data.vacancies;
}

const Vacanciedata = () => {
  const { data, error, isLoading } = useSWR('http://localhost:8000/vacancies', fetcher,{
    refreshInterval:3000
  });
  // console.log({data, error, isLoading}) verifivcar que trae data, error e isloading
  if (error) return <div>Error al cargar</div>;
  if (isLoading) return <div>Cargando</div>;

  return (
    <LayoutAdmin>
      <h1 className="text-xl font-bold mb-6">Vacantes</h1>
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
        {/* filas dinamicas traidas de la api */}
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
            </tr>
          ))}
        </tbody>
      </table>
    </LayoutAdmin>
  );
}

export default Vacanciedata;
