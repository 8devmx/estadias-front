import axios from 'axios';

const Candidates = async () => {
    const candidate_data = await axios.get('http://localhost:8000/candidates');
    return candidate_data;
}

const DeleteCandidates = async (id) => {
    return axios.delete(`http://localhost:8000/candidates/${id}`);
}

export {Candidates, DeleteCandidates};