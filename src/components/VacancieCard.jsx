import React from 'react';
import Link from 'next/link';

const VacancyCard = ({ vacancy }) => (
    <Link href={'/vacancies/${vacancy.id}'}>
        <div className="relative bg-white shadow-md rounded-md p-4 h-32 flex items-center justify-center text-center cursor-pointer transition-opacity duration-300 hover:opacity-80">
            <div className="vacancy-title">
                <h2 className="font-bold text-lg">{vacancy.title}</h2>
            </div>
            <div className="vacancy-details absolute inset-0 bg-white p-4 opacity-0 hover:opacity-100 flex flex-col justify-center transition-opacity duration-300">
                <p><strong>Descripción:</strong> {vacancy.state}</p>
            </div>
        </div>
    </Link >
);

export default VacancyCard;