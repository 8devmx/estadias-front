import axios from 'axios';

const Candidates = async () => {
    const candidate_data = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/candidates`);
    return candidate_data;
}

const DeleteCandidates = async (id) => {
    return axios.delete(`${process.env.NEXT_PUBLIC_API_KEY}/candidates/${id}`);
}

export {Candidates, DeleteCandidates};