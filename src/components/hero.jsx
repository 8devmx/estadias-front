import React from 'react';

const Hero = ({ data }) => {

  console.log(data)
  return (
    <div className='hero text-center' style={{
      background: data.background
    }}>
      <h1>{data.title}</h1>
      <p>{data.paragraph}</p>
      <a href={data.buttonLink} target="_BLANK">{data.buttonText}</a>
    </div >
  );
}

export default Hero;
