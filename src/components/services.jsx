import React from 'react'
import styles from '@/styles/Services.module.css'

const Services = ({data}) => {
  const listServices = data.services
  return (
    <div className={styles.services} data-theme="light">
      <h2>Our service</h2>
      <div className={styles.servicesContainer}>
        { 
          listServices.map((ser, index) => {
            return (
              <div className={styles.service} key={index}>
                <img src={ser.image} alt="" />
                <div className={styles.serviceContent}>
                  <h3>{ser.title}</h3>
                  <p>{ser.paragraph}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Services;
