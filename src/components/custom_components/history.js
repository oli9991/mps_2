import React from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import _ from 'underscore';
import { prettyDate } from '../../utils/utils';
import moment from 'moment';
import { fullName } from '../../utils/localData';

const ReservationHistory = props => {
  const past =
    !_.isEmpty(props.history) &&
    props.history.filter(date => moment(date.end).isBefore(moment()));

  const current =
    !_.isEmpty(props.history) &&
    props.history.filter(
      date =>
        moment(date.start).isBefore(moment()) &&
        moment().isBefore(moment(date.end))
    );
  const future =
    !_.isEmpty(props.history) &&
    props.history.filter(date => moment(date.start).isAfter(moment()));

  return (
    <CustomModal
      title='Istoric rezervări'
      visible={props.isModalVisible}
      cancelButtonProps={null}
      closable
      keyboard
      destroyOnClose
      onCancel={() => props.setIsModalVisible(false)}
      footer={null}
    >
      {<h3>Rezervări trecute</h3>}
      {_.isEmpty(past) && <h4>Nu există înregistrări cu rezervări trecute.</h4>}
      {!_.isEmpty(past) &&
        past.map((reservation, id) => (
          <>
            <h3 style={{ opacity: 1 }}>{fullName(reservation.user)}</h3>
            <p key={id}>
              {prettyDate(reservation.start)},{' '}
              {moment(reservation.start).format('HH:mm')} -{' '}
              {moment(reservation.end).format('HH:mm')}
            </p>
          </>
        ))}
      {<h3>Rezervări curente</h3>}
      {_.isEmpty(current) && (
        <h4>Nu există înregistrări cu rezervări curente.</h4>
      )}
      {!_.isEmpty(current) &&
        current.map((reservation, id) => (
          <>
            <h3 style={{ opacity: 1 }}>{fullName(reservation.user)}</h3>
            <p key={id}>
              {prettyDate(reservation.start)},{' '}
              {moment(reservation.start).format('HH:mm')} -{' '}
              {moment(reservation.end).format('HH:mm')}
            </p>
          </>
        ))}
      {<h3>Rezervări viitoare</h3>}
      {_.isEmpty(future) && (
        <h4>Nu există înregistrări cu rezervări viitoare.</h4>
      )}
      {!_.isEmpty(future) &&
        future.map((reservation, id) => (
          <>
            <h3 style={{ opacity: 1 }}>{fullName(reservation.user)}</h3>
            <p key={id}>
              {prettyDate(reservation.start)},{' '}
              {moment(reservation.start).format('HH:mm')} -{' '}
              {moment(reservation.end).format('HH:mm')}
            </p>
          </>
        ))}
    </CustomModal>
  );
};

export default ReservationHistory;

const CustomModal = styled(Modal)`
  font-family: 'Assistant';
  h3 {
    opacity: 0.8;
    margin-bottom: 5px;
    margin-top: 20px;

    &:first-child {
      margin-top: 0;
    }
  }

  p {
    font-size: 1em;
    margin-bottom: 5px;
  }

  h4 {
    margin-bottom: 20px;
  }
`;
