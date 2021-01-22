import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getReservation,
  getResource,
  updateFinished
} from '../../requests/function';
import CustomButton from './button';
import CustomInput from './input';
import { openNotification } from './notification';
import food from '../../assets/food.svg';

const Card = props => {
  const [resource, setResource] = useState(null);
  useEffect(() => {
    updateFinished(props);
    getResource(props.resourceId, data => setResource(data));
  }, []);

  return (
    <Container>
      <Group>
        <p>Capacitate</p>
        <p>2</p>
      </Group>
      <Group>
        <p>Descriere</p>
        <p>{resource && resource.description}</p>
      </Group>
      <Group>
        <p>Stare</p>
        <p>
          {resource && resource.state === 'Unavailable'
            ? 'Indisponibilă'
            : 'Disponibilă'}
        </p>
      </Group>
      {/* <Group> */}
      {/* <p>Istoric</p> */}
      {/* <p>{props.state}</p> */}
      {/* </Group> */}

      <OuterContainer>
        {resource && resource.state !== 'Unavailable' && (
          <>
            <p>Detalii rezervare</p>
            <CustomInput type='input' placeholder={'data'} />
            <CustomInput type='input' placeholder={'interval'} />
            <CustomInput type='input' placeholder={'motiv'} />
            {!props.onlyView && (
              <CustomButton
                onClick={() =>
                  openNotification(
                    'success',
                    'Rezervare',
                    'Rezervarea a fost înregistrată cu succes'
                  )
                }
              >
                Rezervă
              </CustomButton>
            )}
          </>
        )}
        {resource && resource.state === 'Unavailable' && (
          <p>Ne pare rău, dar această masă deja este rezervată...</p>
        )}
        {resource && resource.state === 'Unavailable' && (
          <img src={food} alt='food' />
        )}
        {resource && resource.state === 'Unavailable' && (
          <p>
            Abonați-va la această masă, iar noi vă vom trimite o notificare când
            este disponibilă. 😉
          </p>
        )}
      </OuterContainer>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  border: none;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
  max-height: 250px;
  min-height: 175px;

  background-color: rgba(93.3%, 93.3%, 93.3%, 0.25);
  color: $2c2c2c;

  border-radius: 10px;
  padding: 10px;
  padding-right: 100px;
  margin-right: 70px;
  margin-bottom: 200px;

  font-weight: normal;

  cursor: pointer;
  font-family: 'Assistant';

  text-align: left;

  position: relative;
`;

const Group = styled.div`
  p {
    &:first-child {
      font-weight: bold;
    }
    margin: 1px 2px;
    width: 35%;
    font-size: 0.9em;
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

  max-height: 350px;
  min-height: 250px;

  background-color: #eeeeee;
  color: #2c2c2c;

  border-radius: 10px;
  padding: 15px;

  font-weight: normal;

  cursor: pointer;
  font-family: 'Assistant';

  text-align: left;

  position: absolute;
  top: 10px;
  left: 100px;

  input {
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  p {
    &:first-child {
      font-weight: bold;
    }
    margin: 4px 10px;
  }

  button {
    color: #eeeeee;
    background-color: #2c2c2c;
    margin: 0px 10px;
    padding: 15px 10px;
    width: calc(100% - 20px);
    border-radius: 7px;
  }

  img {
    object-fit: contain;
    width: 80%;
  }
`;
