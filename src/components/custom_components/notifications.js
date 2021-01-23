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

  const [conclusions, setConclusions] = useState(new Map());

  useEffect(() => {
    setConclusions(new Map());
    setAvailable(0);

    state.user &&
      !_.isEmpty(state.user.subscribed) &&
      state.user.subscribed.forEach(id => {
        !_.isEmpty(props.resources) &&
          props.resources.forEach(resource => {
            resource.resourceId === id &&
              !_.isEmpty(resource.reserved) &&
              props.resources.forEach(reservation => {
                setConclusions(
                  conclusions.set(resource.resourceId, {
                    ...resource,
                    availability: false
                  })
                );
                if (
                  moment(reservation.start).isAfter(moment()) &&
                  moment().isAfter(moment(reservation.end))
                ) {
                  setAvailable(a => (a = a + 1));
                  setConclusions(
                    conclusions.set(resource.resourceId, {
                      ...resource,
                      availability: true
                    })
                  );
                }
              });
          });
      });

    dispatch(setNotifications(availableTables));
  }, [props.resources, state.user, availableTables, dispatch]);

  console.log(
    props.resources,
    state.user && state.user.subscribed,
    availableTables,
    conclusions
  );

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
        {conclusions.forEach((value, _) => {
          if (value.availability === false) {
            return (
              <div key={value.resourceId}>
                <p style={{ fontWeight: 'bold' }}>{value.name}</p>
                <p>Această masă este momentan rezervată.</p>
              </div>
            );
          } else {
            return (
              <div key={value.resourceId}>
                <p style={{ fontWeight: 'bold' }}>{value.name}</p>
                <p>Această masă este liberă.</p>
              </div>
            );
          }
        })}
      </div>
    </CustomModal>
  );
};

const mapStateToProps = store => ({
  notifications: store.notifications,
  resources: store.resources
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
