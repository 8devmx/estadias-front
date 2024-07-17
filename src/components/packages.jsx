import React from 'react';
import styles from '@/styles/Prueba.module.css'

const Packages = ({data}) => {
  
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>{data.title}</h1>
        <p>{data.paragraph}</p>
      </div>
      <div className={styles.pack}>
        {
          data.components.map(component => {
            return (
              <div>
                <img src={component.icon} alt="" />
                <h1>{component.title}</h1>
                <p className={styles.txt}>{component.paragraph}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Packages;
