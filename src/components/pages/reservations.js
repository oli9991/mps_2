import React, { useEffect, useState } from 'react';
import Card from '../custom_components/card';
import Layout from '../layout/layout';
import styles from '../../styling/pages/reservations.module.scss';
import { getAllReservations } from '../../requests/function';
import _ from 'underscore';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getAllReservations(data => setReservations(data));
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        {!_.isEmpty(reservations) &&
          reservations.map(reservation => (
            <Card key={reservation.reservationId} onlyView {...reservation} />
          ))}
      </div>
    </Layout>
  );
};

export default Reservations;
