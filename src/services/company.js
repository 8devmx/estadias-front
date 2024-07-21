import axios from 'axios';

const Company = async () => {
    const company_data = await axios.get('http://localhost:8000/company');
    return company_data;
}

const DeleteCompany = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/company/${id}`);
    } catch (error) {
        console.error('Error al eliminar la company:', error);
    }
}

export { Company, DeleteCompany };
