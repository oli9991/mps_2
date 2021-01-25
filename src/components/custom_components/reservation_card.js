import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  cancelReservation,
  getReservationsForUser,
  getResource
} from '../../requests/function';

import { openNotification } from './notification';
import _ from 'underscore';
import { Skeleton } from 'antd';
import '../../styling/App.scss';
import moment from 'moment';
import { prettyDate } from '../../utils/utils';
import CustomButton from './button';
import { useDispatch } from 'react-redux';
import { updateReservations } from '../../redux/reservations';
import Context from '../../context/context';
import { fullName } from '../../utils/localData';

const ReservationCard = props => {
  const { state } = useContext(Context);
  const dispatch = useDispatch();
  const [resource, setResourse] = useState(null);

  useEffect(() => {
    getResource(props.resourceId, data => setResourse(data));
    // eslint-disable-next-line
  }, []);

  const cancel = () => {
    cancelReservation(props.reservationId, () => {
      openNotification(
        'success',
        'Anulare',
        'Rezervarea a fost anulată cu succes'
      );
      getReservationsForUser(state.user.userId, data => {
        dispatch(updateReservations(data));
      });
    });
  };

  return (
    <Container admin={state.user && state.user.role === 'admin'}>
      {_.isNull(props.resourceId) && (
        <Vertical>
          <Skeleton.Button
            active={true}
            size={'large'}
            shape={'default'}
            style={{ marginBottom: '2px' }}
          />
          <Skeleton.Button
            active={true}
            size={'small'}
            shape={'default'}
            style={{ marginBottom: '2px' }}
          />
          <Skeleton.Button
            active={true}
            size={'large'}
            shape={'default'}
            style={{ marginBottom: '2px' }}
          />
          <Skeleton.Button
            active={true}
            size={'small'}
            shape={'default'}
            style={{ marginBottom: '2px' }}
          />
          <Skeleton.Button
            active={true}
            size={'large'}
            shape={'default'}
            style={{ marginBottom: '2px' }}
          />
          <Skeleton.Button
            active={true}
            size={'small'}
            shape={'default'}
            style={{ marginBottom: '2px' }}
          />
        </Vertical>
      )}
      {!_.isNull(props.resourceId) && (
        <>
          <Vertical>
            <Group>
              <p>Masa</p>
              {!resource && (
                <Skeleton.Button
                  active={true}
                  size={'small'}
                  shape={'default'}
                  style={{ marginBottom: '2px' }}
                />
              )}
              <p>{resource && resource.name}</p>
            </Group>
            {state.user && state.user.role === 'admin' && (
              <Group>
                <p>{fullName(props.user)}</p>
                <a href={`mailto:${props.user.email}`}>{props.user.email}</a>
              </Group>
            )}
            {props.reason && (
              <Group>
                <p>Motiv</p>
                <p>{props.reason}</p>
              </Group>
            )}
            <Group>
              <p>Dată</p>
              <p>{prettyDate(props.start)}</p>
            </Group>
            <Group>
              <p>Interval</p>
              <p>
                {moment(props.start).format('HH:mm')} -{' '}
                {moment(props.end).format('HH:mm')}
              </p>
            </Group>
            {!props.viewOnly && (
              <CustomButton onClick={cancel}>Anuleaza Rezervarea</CustomButton>
            )}
          </Vertical>
        </>
      )}
    </Container>
  );
};

export default ReservationCard;

const Container = styled.div`
  border: none;
  outline: none;
  box-shadow: rgba(255, 255, 255, 0.1) 2.4px 2.4px 3.2px;

  background-color: rgba(93.3%, 93.3%, 93.3%, 0.25);
  color: $2c2c2c;

  border-radius: 10px;
  padding: 10px;
  margin-right: 70px;
  margin-bottom: 20px;
  height: ${props => (props.admin ? '350px' : '300px')};

  width: 25%;

  @media (max-width: 700px) {
    width: 60%;
  }
  @media (max-width: 900px) {
    width: 40%;
  }

  font-weight: normal;

  cursor: pointer;
  font-family: 'Assistant';

  text-align: left;

  display: flex;
  // justify-content: center;
  // align-items: center;

  button {
    height: 35px;
    color: #2c2c2c;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
`;

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`;

const Group = styled.div`
  p,
  a {
    &:first-child {
      font-weight: bold;
      font-size: 1.1em;
    }
    margin: 1px 2px;
    width: 100%;
    font-size: 1em;
    text-decoration: none;
    color: #eeeeee;
  }
  padding: 4px;
`;
