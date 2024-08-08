import axios from 'axios';

const Company = async () => {
    const company_data = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/company`);
    return company_data;
}

const DeleteCompany = async (id) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_KEY}/company/${id}`);
    } catch (error) {
        console.error('Error al eliminar la company:', error);
    }
}

export { Company, DeleteCompany };
