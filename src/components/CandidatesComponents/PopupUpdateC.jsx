import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PopupCandidateForm = ({ candidate, onClose, mutate }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        sobre_mi: '',
        experiencia: '',
        educacion: '',
        habilidades: '',
        intereses: '',
        premios: '',
        foto_perfil: null,
    });

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (candidate) {
            setFormData({
                name: candidate.name || '',
                phone: candidate.phone || '',
                email: candidate.email || '',
                address: candidate.address || '',
                sobre_mi: candidate.sobre_mi || '',
                experiencia: candidate.experiencia || '',
                educacion: candidate.educacion || '',
                habilidades: candidate.habilidades || '',
                intereses: candidate.intereses || '',
                premios: candidate.premios || '',
                foto_perfil: null, // Resetear foto_perfil al editar
            });
        }
    }, [candidate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            foto_perfil: e.target.files[0],
        });
    };

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            if (candidate) {
                // Actualizar candidato existente
                await axios.put(`http://localhost:8000/candidates/${candidate.id}`, formDataToSend, {
                    headers: {
                        ...getAuthHeaders(),
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                // Insertar nuevo candidato
                await axios.post('http://localhost:8000/candidates', formDataToSend, {
                    headers: {
                        ...getAuthHeaders(),
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            mutate();
            onClose();
        } catch (error) {
            console.error('Error al guardar candidato:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/2 max-h-screen overflow-auto">
                <h2 className="text-xl mb-4">{candidate ? 'Editar Candidato' : 'Agregar Candidato'}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4" encType="multipart/form-data">
                    <div className="col-span-2 mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Correo</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            required
                        />
                    </div>
                    <div className="col-span-2 mb-4">
                        <label className="block text-sm font-medium text-gray-700">Dirección</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            required
                        />
                    </div>
                    <div className="col-span-2 mb-4">
                        <label className="block text-sm font-medium text-gray-700">Sobre mí</label>
                        <textarea
                            name="sobre_mi"
                            value={formData.sobre_mi}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                        />
                    </div>
                    <div className="col-span-2 mb-4">
                        <label className="block text-sm font-medium text-gray-700">Experiencia</label>
                        <textarea
                            name="experiencia"
                            value={formData.experiencia}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Educación</label>
                        <input
                            type="text"
                            name="educacion"
                            value={formData.educacion}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Intereses</label>
                        <input
                            type="text"
                            name="intereses"
                            value={formData.intereses}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                        />  
                    </div>
                    <div className="mb-4 col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Habilidades</label>
                        <input
                            type="text"
                            name="habilidades"
                            value={formData.habilidades}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Premios</label>
                        <input
                            type="text"
                            name="premios"
                            value={formData.premios}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                        />
                    </div>
                    <div className="col-span-2 flex justify-center space-x-4 mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 py-2 px-4 bg-gray-500 text-white rounded-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-600 text-white rounded-md"
                        >
                            {candidate ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupCandidateForm; 