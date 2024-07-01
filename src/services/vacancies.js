import axios from 'axios';

const Vacancies = async () => {
    const vacancie_data = await axios.get('http://localhost:8000/vacancies');
    return vacancie_data;
}

export default Vacancies;

