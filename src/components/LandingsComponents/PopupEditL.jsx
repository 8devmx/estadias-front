import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PopupEditL = ({ onClose, mutate, landing }) => {
    const [formData, setFormData] = useState({
        logo: '',
        hero: {
            background: '',
            title: '',
            paragraph: ''
        },
        company_id: '',
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [company, setCompany] = useState([]);

    useEffect(() => {
        if (landing) {
            const parsedHero = landing.hero ? JSON.parse(landing.hero) : {
                background: '',
                title: '',
                paragraph: ''
            };

            setFormData({
                logo: landing.logo || '',
                hero: parsedHero,
                company_id: landing.company_id || '',
            });

            fetchCompany();
        }
    }, [landing]);

    const fetchCompany = async () => {
        try {
            const response = await axios.get('http://localhost:8000/company');
            setCompany(response.data.company);
        } catch (error) {
            console.error('Error al obtener las empresas:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value || ''
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleJSONChange = (key, value) => {
        setFormData(prev => ({
            ...prev,
            hero: {
                ...prev.hero,
                [key]: value || ''
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.company_id) {
            console.error('Error: company_id es requerido y no puede ser null o vacío.');
            return;
        }

        if (!formData.hero) {
            console.error('Error: hero no puede ser null.');
            return;
        }

        const formDataToSend = new FormData();
        if (selectedFile) {
            formDataToSend.append('logo', selectedFile);
        } else {
            formDataToSend.append('logo', formData.logo);
        }
        formDataToSend.append('hero', JSON.stringify(formData.hero));
        formDataToSend.append('company_id', formData.company_id);

        try {
            const response = await axios.put(`http://localhost:8000/landings/${landing.id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Respuesta del servidor:', response.data);
            mutate();
            onClose();

        } catch (error) {
            console.error('Error al editar el landing:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl mb-4">Editar Landing</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Logo</label>
                        <input
                            type="file"
                            name="logo"
                            onChange={handleFileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                        />
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Hero</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Background</label>
                            <input
                                type="text"
                                value={formData.hero.background || ''}
                                onChange={(e) => handleJSONChange('background', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={formData.hero.title || ''}
                                onChange={(e) => handleJSONChange('title', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Paragraph</label>
                            <input
                                type="text"
                                value={formData.hero.paragraph || ''}
                                onChange={(e) => handleJSONChange('paragraph', e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Company</label>
                        <select
                            name="company_id"
                            value={formData.company_id || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                        >
                            <option value="">Select a company</option>
                            {company.map(company => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupEditL;
