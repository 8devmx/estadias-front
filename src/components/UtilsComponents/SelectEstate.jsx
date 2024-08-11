import React, { useState, useEffect } from 'react';

const SelectEstate = ({ value, onChange }) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/states`);
        if (!response.ok) {
          throw new Error('Error al obtener los estados');
        }
        const data = await response.json();
        
        console.log('Estados obtenidos:', data); 
        
        setStates(data); 
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStates();
  }, []);

  return (
    <select value={value} onChange={onChange}>
      <option value="">Seleccione un estado</option>
      {states.map((state) => (
        <option key={state.id} value={state.state}>
          {state.state}
        </option>
      ))}
    </select>
  );
};

export default SelectEstate;
