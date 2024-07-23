import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const VacanciesView = () => {
  const [vacancies, setVacancies] = useState([]);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return; // Espera hasta que el slug esté disponible

    fetch('http://localhost:8000/vacancies')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched vacancies:', data);

        let companyId;
        if (slug === 'Tech-pech') {
          companyId = 2;
        } else if (slug === 'Unid') {
          companyId = 1;
        }

        if (companyId) {
          const filteredVacancies = data.vacancies.filter(vacancy => vacancy.company_id === companyId);
          setVacancies(filteredVacancies);
        } else {
          setVacancies([]);
        }
      })
      .catch(error => console.error('Error fetching vacancies:', error));
  }, [slug]);

  const getTitle = () => {
    switch (slug) {
      case 'Tech-pech':
        return 'TECH-PECH';
      case 'Unid':
        return 'UNID';
      default:
        return 'Vacantes';
    }
  };

  const getBackgroundImage = () => {
    switch (slug) {
      case 'Tech-pech':
        return 'url(https://img.freepik.com/free-photo/top-view-desk-concept-with-notepad_23-2148604955.jpg)';
      case 'Unid':
        return 'url()'; // Aquí puedes añadir una URL de imagen para UNID si lo deseas
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center p-6" style={{ backgroundImage: getBackgroundImage() }}>
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-6 bg-opacity-90">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-4xl font-extrabold text-center text-gray-800">{getTitle()}</h1>
        </header>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Vacantes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(vacancies) && vacancies.length > 0 ? (
            vacancies.map(vacancy => (
              <Link key={vacancy.id} href={`http://localhost:3000/job/${vacancy.id}`}>
                <div className="relative bg-white shadow-md rounded-md p-4 h-32 flex items-center justify-center text-center cursor-pointer transition-opacity duration-300 hover:opacity-80">
                  <div className="vacancy-title">
                    <h2 className="font-bold text-lg">{vacancy.title}</h2>
                  </div>
                  <div className="vacancy-details absolute inset-0 bg-white p-4 opacity-0 hover:opacity-100 flex flex-col justify-center transition-opacity duration-300">
                    <p><strong>Descripción:</strong> {vacancy.state}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">No vacancies available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VacanciesView;
