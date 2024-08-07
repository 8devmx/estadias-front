import axios from 'axios';

const Vacancies = async () => {
    const vacancie_data = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/vacancies`);
    return vacancie_data;
}

const DeleteVacancies = async (id) => {
    return axios.delete(`${process.env.NEXT_PUBLIC_API_KEY}/vacancies/${id}`);
}

export { Vacancies, DeleteVacancies };