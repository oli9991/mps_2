import React, { useEffect } from 'react';
import Card from '../custom_components/card';
import Layout from '../layout/layout';
import styles from '../../styling/pages/reservations.module.scss';
import { getAllResources } from '../../requests/function';
import _ from 'underscore';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect, useDispatch } from 'react-redux';
import { updateResources } from '../../redux/resources';

const Tables = ({ tables }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllResources(data => {
      dispatch(updateResources(data));
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <p className={styles.attention}>
          <ExclamationCircleOutlined />
          Vă încurajăm să analizați intervalele deja rezervate pentru masă
          dorită pe care le gasiți dacă apasați butonul <b>Istoric</b> plasat
          pentru fiecare masă. Dacă, din păcate, intervalul dorit nu este
          disponibil, va rugăm abonați-va astfel încât să fiți notificat dacă
          masă va fi eliberată în acel interval.
        </p>
        {!_.isEmpty(tables) &&
          tables.map(reservation => (
            <Card key={reservation.reservationId} {...reservation} />
          ))}
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({ tables: state.resources });
export default connect(mapStateToProps)(Tables);
