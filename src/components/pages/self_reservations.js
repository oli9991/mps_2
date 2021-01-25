import React, { useContext, useEffect } from 'react';
import Layout from '../layout/layout';
import styles from '../../styling/pages/reservations.module.scss';
import { getReservationsForUser } from '../../requests/function';
import _ from 'underscore';
import Context from '../../context/context';
import ReservationCard from '../custom_components/reservation_card';
import moment from 'moment';
import { connect, useDispatch } from 'react-redux';
import { updateReservations } from '../../redux/reservations';

const SelfReservations = props => {
  const { state } = useContext(Context);
  const dispatch = useDispatch();
  const { savedReservations } = props;

  useEffect(() => {
    state.user &&
      _.isEmpty(savedReservations) &&
      getReservationsForUser(state.user.userId, data => {
        dispatch(updateReservations(data));
      });
    // eslint-disable-next-line
  }, []);

  const sorted =
    !_.isEmpty(savedReservations) &&
    savedReservations.sort((a, b) =>
      moment(a.start).isBefore(moment(b.start)) ? -1 : 1
    );

  return (
    <Layout>
      <div className={styles.container}>
        {_.isEmpty(sorted) && (
          <h3 style={{ width: '100%', textAlign: 'center', color: '#eeeeee' }}>
            Momentan, nu aveți nicio rezervare înregistrată. Pentru a face o
            rezervare, mergeți la pagina <b>Mese</b> 😃.
          </h3>
        )}
        <div className={styles.list}>
          {!_.isEmpty(sorted) &&
            sorted.map(reservation => (
              <ReservationCard
                key={reservation.reservationId}
                {...reservation}
                readOnly
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

export default connect(mapStateToProps)(SelfReservations);
