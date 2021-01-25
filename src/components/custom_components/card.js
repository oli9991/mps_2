import React, { useContext, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  getReservationsForUser,
  reserve,
  subscribe,
  unsubscribe,
  getUser,
  getAllResources
} from '../../requests/function';
import CustomButton from './button';
import CustomInput from './input';
import { openNotification } from './notification';
import _ from 'underscore';
import { Skeleton, DatePicker, TimePicker, Tooltip } from 'antd';
import '../../styling/App.scss';
import moment from 'moment';
import ReservationHistory from './history';
import { updateReservations } from '../../redux/reservations';
import { connect, useDispatch } from 'react-redux';
import Context from '../../context/context';
import {
  calculateNotifications,
  checkIfSubscribed,
  transformSeconds
} from '../../utils/utils';
import { updateResources } from '../../redux/resources';
import { InfoCircleOutlined } from '@ant-design/icons';

const Card = props => {
  const resource = props;
  const [day, setDay] = useState(null);
  const [startHour, setStartHour] = useState(null);
  const [endHour, setEndHour] = useState(null);
  const [reason, setReason] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [availability, setAvailable] = useState(true);
  const [currentReservation, setReservation] = useState(true);

  const { state, dispatch: dispatchContext } = useContext(Context);
  const dispatch = useDispatch();

  const [subscribed, setSubscribed] = useState(
    state.user && checkIfSubscribed(resource.resourceId, state.user.subscribed)
  );

  useEffect(() => {
    setSubscribed(
      state.user &&
        checkIfSubscribed(resource.resourceId, state.user.subscribed)
    );
    // eslint-disable-next-line
  }, [state.user]);

  const sendReservation = () => {
    const start = `${moment(day).format('YYYY-MM-DD')} ${moment(
      startHour
    ).format('HH:mm:ss')}`;
    const end = `${moment(day).format('YYYY-MM-DD')} ${moment(endHour).format(
      'HH:mm:ss'
    )}`;

    reserve(props.resourceId, reason, start, end, () => {
      openNotification(
        'success',
        'Rezervare',
        'Rezervarea a fost înregistrată cu succes'
      );
      getAllResources(data => dispatch(updateResources(data)));
      getReservationsForUser(state.user.userId, data => {
        dispatch(updateReservations(data));
      });
      calcultateAvailability();
      setReason('');
      setDay(null);
      setStartHour(null);
      setEndHour(null);
    });
  };

  const subscribeTo = () => {
    subscribe(props.resourceId, () => {
      openNotification(
        'success',
        'Abonare',
        'Ați fost abonat cu succes la masă. Veți primi notificare când va fi disponibilă.'
      );
      getUser(dispatchContext);
      calculateNotifications(state.user.subscribed);
    });
  };

  const unsubscribeTo = () => {
    unsubscribe(props.resourceId, () => {
      openNotification(
        'success',
        'Abonare',
        'Ați fost dezabonat cu succes de la masă.'
      );
      getUser(dispatchContext);
      calculateNotifications(state.user.subscribed);
    });
  };

  const calcultateAvailability = useCallback(() => {
    if (_.isEmpty(props.reservations)) {
      setAvailable(true);
      return;
    }
    if (!_.isEmpty(props.reservations)) {
      props.reservations.forEach(reservation => {
        if (
          reservation.resourceId === props.resourceId &&
          moment(reservation.start).isBefore(moment()) &&
          moment().isAfter(moment(reservation.start)) &&
          moment(reservation.end).isAfter(moment())
        ) {
          setAvailable(false);
          setReservation(reservation);
          return;
        }
      });
      return;
    }
    // eslint-disable-next-line
  }, [props.reservations]);

  useEffect(() => {
    calcultateAvailability();
    // eslint-disable-next-line
  }, [props.reservations]);

  return (
    <Container>
      <ReservationHistory
        history={props.reservations}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
      {_.isNull(resource) && (
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
      {!_.isNull(resource) && (
        <>
          <Vertical>
            <Group>
              <p>Nume</p>
              <p>{resource && resource.name}</p>
            </Group>
            <Group>
              <p>Capacitate</p>
              <p>{resource && resource.capacity}</p>
            </Group>
            <Group>
              <p>Descriere</p>
              <p>{resource && resource.description}</p>
            </Group>
            <Group>
              <p>Stare</p>
              <p>
                {availability === true ? 'Liberă' : 'Rezervată'}{' '}
                {availability === false && (
                  <Tooltip
                    placement='right'
                    title={`Rezervată de ${transformSeconds(
                      moment().diff(moment(currentReservation.start))
                    )}, mai dureaza ${transformSeconds(
                      moment(currentReservation.end).diff(moment())
                    )}`}
                  >
                    <InfoCircleOutlined style={{ verticalAlign: '-3px' }} />
                  </Tooltip>
                )}
              </p>
            </Group>

            <Group>
              <Horizontal>
                <CustomButton onClick={() => setIsModalVisible(true)}>
                  Istoric
                </CustomButton>
                {state.user && state.user.role !== 'admin' && (
                  <CustomButton
                    onClick={!subscribed ? subscribeTo : unsubscribeTo}
                  >
                    {!subscribed ? 'Abonare' : 'Dezabonare'}
                  </CustomButton>
                )}
              </Horizontal>
            </Group>
          </Vertical>
          {state.user && state.user.role !== 'admin' && (
            <OuterContainer>
              {resource && (
                <>
                  <p>Detalii rezervare</p>
                  <DatePicker
                    value={day}
                    onChange={value => setDay(value)}
                    placeholder='Alege ziua'
                  />
                  <TimePicker
                    value={startHour}
                    onChange={value => setStartHour(value)}
                    placeholder='Alege oră început'
                  />
                  <TimePicker
                    value={endHour}
                    onChange={value => setEndHour(value)}
                    placeholder='Alege oră sfârșit'
                  />
                  <CustomInput
                    type='input'
                    placeholder={'Motiv'}
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                  />
                  {
                    <CustomButton onClick={sendReservation}>
                      Rezervă
                    </CustomButton>
                  }
                </>
              )}
            </OuterContainer>
          )}
        </>
      )}
    </Container>
  );
};

const mapStateToProps = store => ({
  reservations: store.reservations
});
export default connect(mapStateToProps)(Card);

const Container = styled.div`
  width: 25%;
  padding: 10px;
  margin-right: 7.5%;
  margin-bottom: 4%;
  margin-top: 20px;

  @media (max-width: 1300px) {
    width: 30%;
    margin-right: 15%;
  }

  @media (max-width: 1000px) {
    width: 60%;
    margin-right: 10%;
  }

  @media (max-width: 900px) {
    width: 60%;
  }

  @media (max-width: 400px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 120%;
    display: flex;
    flex-direction: column;
  }

  border: none;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
  height: 350px;
  // min-height: 175px;

  background-color: rgba(93.3%, 93.3%, 93.3%, 0.25);
  color: $2c2c2c;

  border-radius: 10px;

  font-weight: normal;

  cursor: pointer;
  font-family: 'Assistant';

  text-align: left;

  display: flex;
`;

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  button {
    &:nth-child(2) {
      background-color: #2c2c2c;
      color: #eeeeee;
    }
  }
`;

const Group = styled.div`
  p {
    &:first-child {
      font-weight: bold;
      font-size: 1.1em;
    }
    margin: 1px 2px;
    width: 100%;
    font-size: 1em;
  }
  button {
    width: 80px;
    height: 20px;
    color: #2c2c2c;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-right: 10px;
  }
  padding: 4px;
`;

const OuterContainer = styled.div`
  border: none;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 110%;
  top: -5%;
  position: relative;

  @media (max-width: 400px) {
    height: 120%;
    top: 2%;
  }

  background-color: #eeeeee;
  color: #2c2c2c;

  border-radius: 10px;
  padding: 15px;

  font-weight: normal;

  cursor: pointer;
  font-family: 'Assistant';

  text-align: left;

  input {
    border: 1px solid rgba(0, 0, 0, 0.1);
    height: 35px;
    border-radius: 4px;
  }

  .ant-picker {
    margin: 4px 8px;
    background: transparent;
    color: #2c2c2c !important;
    width: 89%;
    height: 35px;

    input {
      border: none;
    }
  }
  .ant-picker-focused {
    box-shadow: none;
    border-color: none !important;
  }

  .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner,
  .ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner,
  .ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner {
    background-color: #2c2c2c !important;
  }

  .ant-picker-header-view {
    color: #2c2c2c !important;
  }
  p {
    &:first-child {
      font-weight: bold;
      text-align: left;
      width: 100%;
      padding-left: 10px;
    }
    margin: 2px 10px !important;
  }

  button {
    color: #eeeeee;
    background-color: #2c2c2c;
    margin: 0px 10px;
    padding: 15px 10px;
    width: calc(100% - 20px);
    border-radius: 4px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    object-fit: contain;
    width: 80%;
  }
`;
