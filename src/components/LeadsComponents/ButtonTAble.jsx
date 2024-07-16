import React, { useState } from 'react';
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { MdMore } from "react-icons/md";
import ModalButtom from '@/components/LeadsComponents/ModalDetails';
import ButtonEdit from './ButtonEdit';

const ButtonTable = ({ leadId, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleDelete = () => {
    onDelete(leadId);
  };

  return (
    <div className="flex space-x-1 p-1">
      <div className="w-1/3 flex">
        <button onClick={handleOpenModal} className="mt-1 w-full rounded-md bg-green-500 text-white py-2 px-2 flex items-center justify-center">
          <MdMore />
        </button>
      </div>
      <div className="w-1/3 flex">
        <button onClick={handleOpenEditModal} className="mt-1 w-full rounded-md bg-green-500 text-white py-2 px-2 flex items-center justify-center">
          <FaPen />
        </button>
      </div>
      <div className="w-1/3 flex">
        <button onClick={handleDelete} className="mt-1 w-full rounded-md bg-red-500 text-white py-2 px-2 flex items-center justify-center">
          <FaTrashAlt />
        </button>
      </div>
      {showModal && (
        <ModalButtom leadId={leadId} onClose={handleCloseModal} />
      )}
      {showEditModal && (
        <ButtonEdit leadId={leadId} onClose={handleCloseEditModal} />
      )}
    </div>
  );
};

export default ButtonTable;
