// Navbar.jsx
import React, { useEffect, useState } from 'react';
import styles from '@/styles/Navbar.module.css';

const Navbar = ({ logo }) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!logo) {
    return <div>Logo is missing</div>;
  }

  return (
    <div className={`${styles.navbar} ${scroll ? styles.scroll : ''}`}>
      <div className={styles.logo}>
        <img src={`/${logo}`} alt="Company Logo" />
      </div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Servicios</a></li>
          <li><a href="#packages">Paquetes</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;