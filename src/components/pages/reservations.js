import React, { useContext, useEffect } from 'react';
import Layout from '../layout/layout';
import styles from '../../styling/pages/reservations.module.scss';
import { getAllReservations } from '../../requests/function';
import _ from 'underscore';
import ReservationCard from '../custom_components/reservation_card';
import Context from '../../context/context';
import { connect, useDispatch } from 'react-redux';
import { updateReservations } from '../../redux/reservations';

const Reservations = props => {
  const { state } = useContext(Context);
  const dispatch = useDispatch();
  const { savedReservations } = props;

  useEffect(() => {
    ((state.user && state.user.role !== 'admin') ||
      (state.user &&
        state.user.role === 'admin' &&
        _.isEmpty(savedReservations))) &&
      getAllReservations(data => dispatch(updateReservations(data)));
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.list}>
          {!_.isEmpty(savedReservations) &&
            savedReservations.map(reservation => (
              <ReservationCard
                key={reservation.reservationId}
                {...reservation}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = ({ reservations }) => ({
  savedReservations: reservations
});

export default connect(mapStateToProps)(Reservations);
