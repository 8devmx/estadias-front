// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import LayoutAdmin from '@/components/LayoutAdmin';

// const Companies = () => {
//     const [companies, setCompanies] = useState([]);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/company');
//             if (response.data && response.data.company && Array.isArray(response.data.company)) {
//                 setCompanies(response.data.company);
//             } else {
//                 console.error('Data received is not in the expected format:', response.data);
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <div>
//             <LayoutAdmin>
//                 <h1 className="text-xl font-bold mb-6">Companies</h1>
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Address</th>
//                             <th>Logo</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {companies.map(company => (
//                             <tr key={company.id}>
//                                 <td>{company.id}</td>
//                                 <td>{company.name}</td>
//                                 <td>{company.mail}</td>
//                                 <td>{company.phone}</td>
//                                 <td>{company.contact}</td>
//                                 <td>
//                                     <img src={company.logo} alt={`Logo de ${company.name}`} style={{ width: '50px', height: 'auto' }} />
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </LayoutAdmin>
//         </div>
//     );
// };
// export default Companies;




// con axios
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/services/axiosConfig'; // Importa la instancia de axios configurada
import LayoutAdmin from '@/components/LayoutAdmin';

const Companies = () => {
    const [companies, setCompanies] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/company');
            // Accede a la propiedad 'company' dentro de la respuesta
            if (response.data && Array.isArray(response.data.company)) {
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
                                <td>{company.address}</td> {/* Ajuste en el nombre del campo */}
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
