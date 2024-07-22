import React from 'react';
import styles from '@/styles/Hero.module.css';

const Hero = ({ data }) => {

  console.log(data)
  return (
    <div
      className={styles.hero}
      style={{ backgroundImage: `url(/${data.background})` }}
    >
      <h1>{data.title}</h1>
      <p>{data.paragraph}</p>
      <a href={data.buttonLink} target="_blank" rel="noopener noreferrer">
        {data.buttonText}
      </a>
    </div>
  );
};

export default Hero;
