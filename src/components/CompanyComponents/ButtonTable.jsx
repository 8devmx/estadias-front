import React from 'react';
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { DeleteCompany } from "@/services/company";

const handleDeleteCompany = async (id, mutate) => {
    if (window.confirm("¿Confirma si quieres borrar esta company?")) {
        try {
            await DeleteCompany(id);
            mutate(); 
        } catch (error) {
            console.error('Error al eliminar la company', error);
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
                <button className="mt-1 w-full rounded-md bg-red-500 text-white py-2 px-2 flex items-center justify-center " onClick={() => handleDeleteCompany(id, mutate)}>
                    <FaTrashAlt />
                </button>
            </div>
        </div>
    );
};

export default ButtonTable;
