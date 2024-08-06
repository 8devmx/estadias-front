import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const VacanciesView = () => {
  const [vacancies, setVacancies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return;

<<<<<<< Updated upstream
    fetch('http://localhost:8000/vacanciesfront')
=======
    const normalizedSlug = slug.toLowerCase();
    const validSlugs = ['tech-pech', 'unid', 'walmart'];
    if (!validSlugs.includes(normalizedSlug)) {
      setIsValidSlug(false);
      return;
    } else {
      setIsValidSlug(true);
    }

    fetch(`${process.env.NEXT_PUBLIC_API_KEY}/vacanciesfront`)
>>>>>>> Stashed changes
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
          console.log(data.vacancies)
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
    if (slug === 'Tech-pech') {
      return 'url(https://www.itl.cat/pngfile/big/292-2921393_website-design-stock.jpg)';
    } else {
      return 'url(https://lh3.googleusercontent.com/p/AF1QipOOG0E9Ud6yM93zbG5JuFuSBs3fxNyGeHEwFXUR=s1360-w1360-h1020)';
    }
  };

  const getLogo = () => {
    if (slug === 'Tech-pech') {
      return '/logoTechPech.jpg';
    } else {
      return 'https://educompara.com/file/2020/06/Logo-UNID-Edu-02.jpg';
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredVacancies = vacancies.filter(vacancy =>
    vacancy.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage: getBackgroundImage(),
        backgroundPosition: 'center',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="fixed top-0 left-0 w-full bg-gray-200 p-2 shadow-md z-10 flex justify-between items-center">
        <div className="flex items-center" style={{ position: 'relative', left: '15%' }}>
          <img src={getLogo()} alt="Logo" className="h-10 mr-2 rounded-full" />
          <span className="text-xl font-bold text-black">{getTitle()}</span>
        </div>
        <h1 className="text-2xl font-bold text-black">Vacantes</h1>
        <input
          type="text"
          placeholder="Buscar vacante ..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded-md"
          style={{ position: 'relative', right: '15%' }}
        />
      </div>
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-6 bg-opacity-90 mt-16">
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
  );
};

export default VacanciesView;
