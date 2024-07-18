import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { DeleteCandidates } from "@/services/candidates";

const DeleteCandidate = async (id, mutate) => {
    if (window.confirm("¿Confirma si quieres borrar este candidato?")) {
        try {
            await DeleteCandidates(id);
            mutate(); // para actualizar
        } catch (error) {
            console.error('Error al eliminar al candidato', error);
        }
    }
}

const ButtonTAble = ({ id, mutate, onEdit }) => {
    return (
        <div className="flex space-x-1 p-1">
            <div className="w-1/2 flex ">
                <button className="mt-1 w-full rounded-md bg-green-500 text-white py-2 px-2 flex items-center justify-center " onClick={onEdit}>
                    <FaPen />
                </button>
            </div>
            <div className="w-1/2 flex ">
                <button className="mt-1 w-full rounded-md bg-red-500 text-white py-2 px-2 flex items-center justify-center " onClick={() => DeleteCandidate(id, mutate)}>
                    <FaTrashAlt />
                </button>
            </div>
        </div>
    );
};

export default ButtonTAble;