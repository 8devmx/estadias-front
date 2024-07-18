import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LayoutAdmin from '@/components/LayoutAdmin';

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
        </div>
    );
};
export default Companies;