import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { DeleteVacancies } from "@/services/vacancies";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

const DeleteVacancie = async (id, mutate) => {
    if (window.confirm("¿Confirma si quieres borrar esta vacante?")) {
        try { //tengo que poner la api si no no puedo enviar los encabezados 
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/vacancies/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
              });
        
              if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(errorDetails || 'Error deleting candidate');
              }
            mutate(); // para actualizar
        } catch (error) {
            console.error('Error al eliminar la vacante', error);
        }
    }
}

const ButtonTable = ({ id, mutate, onEdit }) => {
    return (
        <div className="flex space-x-1 p-1">
            <button className="flex-1 mt-1 rounded-md bg-green-500 text-white py-2 px-2 flex items-center justify-center" onClick={onEdit}>
                <FaPen />
            </button>
            <button className="flex-1 mt-1 rounded-md bg-red-500 text-white py-2 px-2 flex items-center justify-center" onClick={() => DeleteVacancie(id, mutate)}>
                <FaTrashAlt />
            </button>
        </div>
    );
};

export default ButtonTable;