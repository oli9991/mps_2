import React, { useEffect } from 'react';
import Footer from './footer';
import Header from './header';
import styles from '../../styling/layout/layout.module.scss';
import _ from 'underscore';
import { Redirect } from 'react-router-dom';
import { getToken } from '../../utils/localData';

const Layout = ({ children }) => {
  useEffect(() => {
    if (_.isNull(getToken())) {
      return <Redirect to='/' />;
    }
  }, []);

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
