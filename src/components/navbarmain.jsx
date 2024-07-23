import React from 'react';
import styles from '@/styles/Navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src="TechLogo.png" alt="" />
      </div>
    </div>
  );
}

export default Navbar;
