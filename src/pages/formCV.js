import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Formulario = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        sobre_mi: '',
        experiencia: '',
        educacion: '',
        habilidades: '',
        intereses: '',
        premios: '',
        foto_perfil: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({
            ...form,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });

            const response = await fetch('http://localhost:8000/candidates', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                console.log('Formulario enviado:', form);
                router.push('gracias'); // Redirige a la página de agradecimiento
            } else {
                console.error('Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">¡¡Completa tu perfil!!</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Sobre Mí:</label>
                    <textarea
                        name="sobre_mi"
                        value={form.sobre_mi}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Experiencia:</label>
                    <textarea
                        name="experiencia"
                        value={form.experiencia}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Educación:</label>
                    <textarea
                        name="educacion"
                        value={form.educacion}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Habilidades:</label>
                    <textarea
                        name="habilidades"
                        value={form.habilidades}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Intereses:</label>
                    <textarea
                        name="intereses"
                        value={form.intereses}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Premios:</label>
                    <textarea
                        name="premios"
                        value={form.premios}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Foto de Perfil:</label>
                    <input
                        type="file"
                        name="foto_perfil"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <button href="/GraciasCV" type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">Enviar</button>
            </form>
        </div>
    );
};

export default Formulario;
