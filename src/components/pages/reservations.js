import React, { useEffect, useState } from 'react';
import Layout from '../layout/layout';
import styles from '../../styling/pages/reservations.module.scss';
import { getAllReservations } from '../../requests/function';
import _ from 'underscore';
import ReservationCard from '../custom_components/reservation_card';

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
            <ReservationCard key={reservation.reservationId} {...reservation} />
          ))}
      </div>
    </Layout>
  );
};

export default Reservations;
