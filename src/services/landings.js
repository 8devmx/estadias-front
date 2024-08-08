import axios from 'axios';

const Landings = async () => {
    const landings_data = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/landings`);
    return landings_data;
}

const DeleteLanding = async (id) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_KEY}/landings/${id}`);
    } catch (error) {
        console.error('Error al eliminar el landing:', error);
    }
}

export { Landings, DeleteLanding };