import React, { useState } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin';
import { Company } from '@/services/company';
import useSWR from 'swr';
import ButtonTable from '@/components/CompanyComponents/ButtonTable';
import PopupEditC from '@/components/CompanyComponents/PopupEditC';
import styles from '@/styles/Componenadm.module.css';
import PopupInsertC from '@/components/CompanyComponents/PopupInsertC';


const Companies = () => {

  return (
    <LayoutAdmin>
      <h1 className="text-xl font-bold mb-6">Empresas</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          {/* row 2 */}
          <tr className="hover">
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
        </tbody>
      </table>
    </LayoutAdmin>
  );
}
    const [companies, setCompanies] = useState([]);


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/company');
            if (response.data && response.data.company && Array.isArray(response.data.company)) {
                setCompanies(response.data.company);
            } else {
                console.error('Data received is not in the expected format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <LayoutAdmin>
                <h1 className="text-xl font-bold mb-6">Companies</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Logo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map(company => (
                            <tr key={company.id}>
                                <td>{company.id}</td>
                                <td>{company.name}</td>
                                <td>{company.mail}</td>
                                <td>{company.phone}</td>
                                <td>{company.contact}</td>
                                <td>
                                    <img src={company.logo} alt={`Logo de ${company.name}`} style={{ width: '50px', height: 'auto' }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </LayoutAdmin>

const fetcher = async () => {
  const data = await Company();
  return data.data.company;
}

const CompanyData = () => {
  const { data, error, isLoading, mutate } = useSWR('http://localhost:8000/company', fetcher)
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);

  if (error) return <div>Error al cargar</div>;
  if (isLoading) return <div>Cargando</div>;

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleEditClick = (company) => {
    setCurrentCompany(company);
    setShowEditForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowEditForm(false);
  };

  return (
    <LayoutAdmin>
      <h1 className="text-xl font-bold mb-6">Companies</h1>
      <div className="flex justify-between p-4">
        <div className="w-1/2">
          <input
            type="text"
            id={styles.input}
            name="first-input"
            placeholder="Buscar"
            className="mt-1 block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />

        </div>
        <div className="w-1/6 flex items-end">
          <button
            className="mt-1 block w-full rounded-md bg-black text-white py-2 px-4" onClick={handleAddClick}
          >
            Agregar
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mail</th>
            <th>Phone</th>
            <th>Contact</th>
            <th>Logo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((company, index) => (
            <tr key={index} className="hover">
              <th>{company.id}</th>
              <td>{company.name}</td>
              <td>{company.mail}</td>
              <td>{company.phone}</td>
              <td>{company.contact}</td>
              <td>{company.logo}</td>
              <td>
                <ButtonTable id={company.id} mutate={mutate} onEdit={() => handleEditClick(company)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && <PopupInsertC onClose={handleCloseForm} mutate={mutate} />}
      {showEditForm && <PopupEditC onClose={handleCloseForm} mutate={mutate} company={currentCompany} />}
    </LayoutAdmin>
  );
}

export default CompanyData;