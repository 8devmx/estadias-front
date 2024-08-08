import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PopupEdit = ({ onClose, mutate, vacancie, canEdit, companyID }) => {
    const [formData, setFormData] = useState({
        state: vacancie.state,
        category: vacancie.category,
        title: vacancie.title,
        company_id: vacancie.company_id,
        description: vacancie.description,
        type: vacancie.type,
        requirements: vacancie.requirements,
        salary: vacancie.salary,
    });

    const [states, setStates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [types, setTypes] = useState([]);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/states`);
                setStates(response.data);
            } catch (error) {
                console.error('Error fetching states:', error);
            }
        };
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('${process.env.NEXT_PUBLIC_API_KEY}/companyfront');
                setCompanies(response.data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };
        const fetchTypes = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}/types`);
                setTypes(response.data);
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };
        fetchStates();
        fetchCategories();
        fetchCompanies();
        fetchTypes();
    }, []);

    useEffect(() => {
        setFormData({
            state: vacancie.state,
            category: vacancie.category,
            title: vacancie.title,
            company_id: vacancie.company_id,
            description: vacancie.description,
            type: vacancie.type,
            requirements: vacancie.requirements,
            salary: vacancie.salary,
        });
    }, [vacancie]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_KEY}/vacancies/${vacancie.id}`, formData,  { headers: getAuthHeaders(),});
            mutate();
            onClose();
        } catch (error) {
            console.error('Error al editar la vacante:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-2/3">
                <h2 className="text-xl mb-4">Editar Vacante</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Estado</label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            required
                        >
                            <option value="">Selecciona un estado</option>
                            {states.map((state) => (
                                <option key={state.id} value={state.state}>
                                    {state.state}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Categoría</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            required
                        >
                            <option value="" disabled>Selecciona una categoría</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.category}>
                                    {category.category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4" style={{pointerEvents: !canEdit ? 'none' : 'auto', opacity: !canEdit ? 0.5 : 1}}>
                        <label className="block text-sm font-medium text-gray-700">Compañía</label>
                        <select
                            name="company_id"
                            value={formData.company_id}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            required
                        >
                            <option value="" disabled>Selecciona una Compañía</option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4 col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tipo</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            required
                        >
                            <option value="" disabled>Selecciona un tipo</option>
                            {types.map((type) => (
                                <option key={type.id} value={type.type}>
                                    {type.type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Salario</label>
                        <input
                            type="text"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4 col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Requisitos</label>
                        <input
                            type="text"
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white"
                            required
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
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupEdit;