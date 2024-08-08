import React from 'react';

const Imagen = ({ data }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={`/${data.background}`} alt="Background Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};

export default Imagen;
