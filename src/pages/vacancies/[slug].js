import Hero from '@/components/imagen';
import Navbar from '@/components/logo';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const url = `http://localhost:8000/landingslg/slug/${slug}`;
  
  try {
    const res = await fetch(url);

    if (!res.ok) {
      return { notFound: true };
    }

    const data = await res.json();

    if (!data) {
      return { notFound: true };
    }

    
    const companyId = data.company_id; // Obtener el company_id de la landing
    const vacanciesRes = await fetch(`http://localhost:8000/vacanciesfront?company_id=${companyId}`);
    const vacanciesData = await vacanciesRes.json();

    return {
      props: { landing: data, vacancies: vacanciesData.vacancies },
    };
  } catch (error) {
    return { notFound: true };
  }
}


export default function Home({ landing, vacancies }) {
  const hero = JSON.parse(landing.hero);
  const logo = landing.logo;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVacancies, setFilteredVacancies] = useState([]);

  useEffect(() => {
    const filtered = vacancies.filter(vacancy =>
      vacancy.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVacancies(filtered);
  }, [searchTerm, vacancies]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="relative min-h-screen">
        <div className="relative z-10" style={{background: `url(/${hero.background})`, width: "100%", height: "100%", backgroundSize:"cover"}}>
          <Navbar logo={logo} />
          <div className="min-h-screen bg-cover bg-center p-6 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-6 bg-opacity-90 mt-16">
              <div className="mb-6 flex justify-center">
                <input
                  type="text"
                  placeholder="Buscar vacante ..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="p-2 border rounded-md w-full max-w-lg"
                />
              </div>
              <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Estas son las vacantes disponibles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.isArray(filteredVacancies) && filteredVacancies.length > 0 ? (
                  filteredVacancies.map(vacancy => (
                    <Link key={vacancy.id} href={`http://localhost:3000/job/${vacancy.id}`}>
                      <div className="relative bg-white shadow-md rounded-md p-4 h-32 flex items-center justify-center text-center cursor-pointer transition-colors duration-300 hover:text-blue-500 text-black">
                        <div className="vacancy-title">
                          <h2 className="font-bold text-lg">{vacancy.title}</h2>
                        </div>
                        <div className="vacancy-details absolute inset-0 bg-white p-4 opacity-0 hover:opacity-100 flex flex-col justify-center transition-opacity duration-300">
                          <p><strong>Ubicación:</strong> {vacancy.state}</p>
                          <p><strong>Tipo:</strong> {vacancy.type}</p>
                          <p><strong>Categoría:</strong> {vacancy.category}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-center text-gray-500">►Sin vacantes disponibles◄</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
