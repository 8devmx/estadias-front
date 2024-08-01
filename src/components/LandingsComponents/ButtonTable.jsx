import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { DeleteLanding } from "@/services/landings";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

const handleDeleteLanding = async (id, mutate) => {
    if (window.confirm("¿Confirma si quieres borrar este landing?")) {
        try { //tengo que poner la api si no no puedo enviar los encabezados 
            const response = await fetch(`http://localhost:8000/landings/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
              });
        
              if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(errorDetails || 'Error deleting candidate');
              }
            mutate(); // para actualizar
        } catch (error) {
            console.error('Error al eliminar el landing', error);
        }
    }
}

const ButtonTable = ({ id, mutate, onEdit }) => {
    return (
        <div className="flex space-x-1 p-1">
            <div className="w-1/2 flex ">
                <button className="mt-1 w-full rounded-md bg-green-500 text-white py-2 px-2 flex items-center justify-center " onClick={onEdit}>
                    <FaPen />
                </button>
            </div>
            <div className="w-1/2 flex ">
                <button className="mt-1 w-full rounded-md bg-red-500 text-white py-2 px-2 flex items-center justify-center " onClick={() => handleDeleteLanding(id, mutate)}>
                    <FaTrashAlt />
                </button>
            </div>
        </div>
    );
};

export default ButtonTable;