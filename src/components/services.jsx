import React from 'react'
import styles from '@/styles/Services.module.css'

const Services = ({ data }) => {
  const listServices = data.services
  return (
    <section
      id="services"
      className={styles.services}
      data-theme="light"
    >
      <h2>Servicios</h2>
      <div className={styles.servicesContainer}>
        {listServices.map((ser, index) => (
          <div className={styles.service} key={index}>
            <img src={`/${ser.image}`} alt={ser.title} />
            <div className={styles.serviceContent}>
              <h3>{ser.title}</h3>
              <p>{ser.paragraph}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;