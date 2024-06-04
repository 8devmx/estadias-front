import React from 'react';
import styles from '@/styles/Prueba.module.css'

const Packages = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>We always try to give you the best service</h1>
        <p>We always try to make our customer Happy. We provide all kind offacilities. Your Satisfaction is our main priority.</p>
      </div>
      <div className={styles.pack}>
        <div>
          <img src="calendar.svg" alt="" />
          <h1>15+</h1>
          <p className={styles.txt}>Years of <br/>Experience</p>
        </div>
        <div>
          <img src="grafics.svg" alt="" />
          <h1>15k+</h1>
          <p className={styles.txt}>Happy <br/>Travellers</p>
        </div>
        <div>
          <img src="dot-map.svg" alt="" />
          <h1>650+</h1>
          <h2>Places Visited</h2>
        </div>
        <div>
          <img src="clock.svg" alt="" />
          <h1>2k+</h1>
          <h2>Travel History</h2>
        </div>
      </div>
    </div>
  );
}

export default Packages;
