import React from 'react'
import styles from '@/styles/Services.module.css'

const listServices = [
  {
    image: "ticket.svg",
    title: "Ticket Booking",
    paragraph: "We book all kind of national or international ticket for your destinaion."
  },
  {
    image: "hotel.svg",
    title: "Hotel Booking",
    paragraph: "You can easily book your according to your budget hotel by our website."
  },
  {
    image: "plane.svg",
    title: "Tour Plan",
    paragraph: "We provide you the best plan within a short time explore more."
  }
]

const Services = () => {
  return (
    <div className={styles.services}>
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
