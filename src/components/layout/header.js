import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styling/layout/header.module.scss';
import * as assets from '../../assets/index';

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to='/reservations'>Rezervări</Link>
      <Link to='/'>
        <img className={styles.logo} alt='logo' src={assets.logo}></img>
      </Link>
      <div className={styles.authSection}>
        <Link to='/login'>Autentificare</Link>
        <Link to='/register'>Înregistrare</Link>
      </div>
    </div>
  );
};

export default Header;
