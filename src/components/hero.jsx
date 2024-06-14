import React from 'react';
import styles from '@/styles/Hero.module.css'

const Hero = ({ data }) => {

  console.log(data)
  return (
    <div className={`${styles.hero} text-center`}>
      <h1>{data.title}</h1>
      <p>{data.paragraph}</p>
      <a href={data.buttonLink} target="_BLANK">{data.buttonText}</a>
    </div >
  );
}

export default Hero;
