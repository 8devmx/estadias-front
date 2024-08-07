import React from 'react';
import styles from '@/styles/Prueba.module.css';

const Packages = ({ data }) => {
  // Definir el estilo del fondo directamente en el componente
  const backgroundStyle = {
    backgroundImage: `url('/${data.background}')`,
  };

  return (
    <section
      id="packages"
      style={backgroundStyle}
      className={styles.container}
    >
      <div className={styles.text}>
        <h1>{data.title}</h1>
        <p>{data.paragraph}</p>
      </div>
      <div className={styles.pack}>
        {data.components.map((component, index) => (
          <div key={index}>
            <img src={`/${component.icon}`} alt={component.title} />
            <h1>{component.title}</h1>
            <p className={styles.txt}>{component.paragraph}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Packages;