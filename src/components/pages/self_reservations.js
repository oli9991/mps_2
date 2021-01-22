import React from 'react';
import Card from '../custom_components/card';
import Layout from '../layout/layout';
import styles from '../../styling/pages/reservations.module.scss';

const SelfReservations = () => {
  const reservation = {
    id: 1,
    capacity: 4,
    placement: 'afara',
    state: 'libera'
  };
  return (
    <Layout>
      <div className={styles.container}>
        <Card {...reservation} />
        <Card {...reservation} />
        <Card {...reservation} />
        <Card {...reservation} />
        <Card {...reservation} />
      </div>
    </Layout>
  );
};

export default SelfReservations;
