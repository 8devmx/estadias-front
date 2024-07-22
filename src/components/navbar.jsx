import React from 'react';
import styles from '@/styles/Navbar.module.css';

const Navbar = ({ logo }) => {
  if (!logo) {
    return <div>Logo is missing</div>; 
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src={`/${logo}`} alt="Company Logo" />
      </div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#packages">Packages</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
