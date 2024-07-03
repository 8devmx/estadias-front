import React from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import Candidates from '@/services/candidates';
import useSWR from 'swr';

const fetcher = async () => {
  const data = await Candidates();
  // console.log(data);  verificar primero que data tenga los datos que trae Candidates del services
  return data.data.Candidates;
}

const CandidateData = () => {
  const { data, error, isLoading } = useSWR('http://localhost:8000/candidates', fetcher,{
    refreshInterval:3000
  });
  // console.log({data, error, isLoading}) verifivcar que trae data, error e isloading
  if (error) return <div>Error al cargar</div>;
  if (isLoading) return <div>Cargando</div>;

  return (
    <LayoutAdmin>
      <h1 className="text-xl font-bold mb-6">Candidatos</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Telefóno</th>
            <th>Correo</th>
            <th>Dirección</th>
          </tr>
        </thead>
          {/* Filas dinamicas traidas de la api */}
        <tbody>
          {data.map((candidates, index) => (
            <tr key={index} className="hover">
              <th>{candidates.id}</th>
              <td>{candidates.name}</td>
              <td>{candidates.phone}</td>
              <td>{candidates.email}</td>
              <td>{candidates.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </LayoutAdmin>
  );
}

export default CandidateData;
