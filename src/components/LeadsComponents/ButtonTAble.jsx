import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

const ButtonTAble = () => {
    return (
        <div className="flex space-x-1 p-1">
            <div className="w-1/2 flex ">
                <button className="mt-1 block w-full rounded-md bg-green-500 text-white py-2 px-2 flex items-center justify-center ">
                    <FaPen />
                </button>
            </div>
            <div className="w-1/2 flex ">
                <button className="mt-1 block w-full rounded-md bg-red-500 text-white py-2 px-2 flex items-center justify-center ">
                    <FaTrashAlt />
                </button>
            </div>
        </div>
    );
};

export default ButtonTAble;