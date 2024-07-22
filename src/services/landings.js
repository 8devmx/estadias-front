import axios from 'axios';

const Landings = async () => {
    const landings_data = await axios.get('http://localhost:8000/landings');
    return landings_data;
}

const DeleteLanding = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/landings/${id}`);
    } catch (error) {
        console.error('Error al eliminar el landing:', error);
    }
}

export { Landings, DeleteLanding };