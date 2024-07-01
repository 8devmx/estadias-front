import axios from 'axios';

const Candidates = async () => {
    const candidate_data = await axios.get('http://localhost:8000/candidates');
    return candidate_data;
}

export default Candidates;

