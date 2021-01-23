import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
import _ from 'underscore';

import { connect, useDispatch } from 'react-redux';
import { setModal } from '../../redux/notifications';
import Context from '../../context/context';

const Notifications = props => {
  const dispatch = useDispatch();
  const { state } = useContext(Context);

  const [conclusions, setConclusions] = useState([]);

  console.log(props);
  useEffect(() => {
    state.user &&
      !_.isEmpty(state.user.subscribed) &&
      state.user.subscribed.forEach(id => {
        !_.isEmpty(props.resources) &&
          props.resources.forEach(resource => {
            if (resource.resourceId === id) {
              setConclusions(c => c.push([resource]));
            }
          });
      });
  }, [props.resources]);

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

      <div></div>
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
