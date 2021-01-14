import React from 'react';
import Footer from './footer';
import Header from './header';
import styles from '../../styling/layout/layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
