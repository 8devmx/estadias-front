import React, { useState, useEffect } from 'react';
import VacancyCard from './VacancyCard';
import Header from './Header';

const VacanciesView = () => {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_KEY}/vacancies`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched vacancies:', data); // Verificar datos recuperados
        if (data && Array.isArray(data.vacancies)) {
          const filteredVacancies = data.vacancies.filter(vacancy => vacancy.company_id === 2);
          setVacancies(filteredVacancies); 
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch(error => console.error('Error fetching vacancies:', error));
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center p-6" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/top-view-desk-concept-with-notepad_23-2148604955.jpg)' }}>
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-6 bg-opacity-90">
        <Header />
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Vacantes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(vacancies) && vacancies.length > 0 ? (
            vacancies.map(vacancy => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))
          ) : (
            <p className="text-center text-gray-500">No vacancies available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VacanciesView;
