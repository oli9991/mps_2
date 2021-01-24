import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import _ from 'underscore';

import { connect, useDispatch } from 'react-redux';
import { setModal, setNotifications } from '../../redux/notifications';
import Context from '../../context/context';
import moment from 'moment';

const Notifications = props => {
  const dispatch = useDispatch();
  const { state } = useContext(Context);
  const [availableTables, setAvailable] = useState(0);
  const [availabilities, setAv] = useState([]);

  const [conclusions, setConclusions] = useState(new Map());

  useEffect(() => {
    setConclusions(new Map());
    setAv([]);
    setAvailable(0);

    state.user &&
      !_.isEmpty(state.user.subscribed) &&
      state.user.subscribed.forEach(id => {
        !_.isEmpty(props.resources) &&
          props.resources.forEach(resource => {
            resource.resourceId === id &&
              !_.isEmpty(resource.reserved) &&
              resource.reserved.forEach(reservation => {
                setConclusions(
                  conclusions.set(resource.resourceId, {
                    ...resource,
                    availability: true
                  })
                );
                setAvailable(state.user.subscribed.length);

                if (
                  moment(reservation.start).isBefore(moment()) &&
                  moment().isAfter(moment(reservation.start)) &&
                  moment(reservation.end).isAfter(moment())
                ) {
                  setAvailable(a => (a = a - 1));
                  setConclusions(
                    conclusions.set(resource.resourceId, {
                      ...resource,
                      availability: false
                    })
                  );
                }
              });
          });
      });

    dispatch(setNotifications(availableTables));
    conclusions.forEach(value => setAv(a => a.concat([value])));
    // eslint-disable-next-line
  }, [
    props.resources,
    state.user,
    availableTables,
    dispatch,
    props.reservations
  ]);

  return (
    <CustomModal
      title='Notificări'
      visible={props.notifications.modalOpened}
      cancelButtonProps={null}
      closable
      keyboard
      destroyOnClose
      onCancel={() => dispatch(setModal(false))}
      footer={null}
    >
      <p>
        Sunteti abonat la {state.user && state.user.subscribed.length}{' '}
        {state.user && state.user.subscribed.length === 1 ? 'masă' : 'mese'}.
      </p>

      <div>
        {availabilities.map((value, _) =>
          value.availability === false ? (
            <div key={value.resourceId}>
              <p style={{ fontWeight: 'bold' }}>{value.name}</p>
              <p>Această masă este momentan rezervată.</p>
            </div>
          ) : (
            <div key={value.resourceId}>
              <p style={{ fontWeight: 'bold' }}>{value.name}</p>
              <p>Această masă este liberă.</p>
            </div>
          )
        )}
      </div>
    </CustomModal>
  );
};

const mapStateToProps = store => ({
  notifications: store.notifications,
  resources: store.resources,
  reservations: store.reservations
});
export default connect(mapStateToProps)(Notifications);

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
