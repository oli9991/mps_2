import React from 'react';
import styled from 'styled-components';
import CustomButton from './button';
import CustomInput from './input';
import { openNotification } from './notification';

const Card = props => {
  return (
    <Container>
      <Group>
        <p>Capacitate</p>
        <p>{props.capacity}</p>
      </Group>
      <Group>
        <p>Amplasare</p>
        <p>{props.placement}</p>
      </Group>
      <Group>
        <p>Stare</p>
        <p>{props.state}</p>
      </Group>
      {/* <Group> */}
      {/* <p>Istoric</p> */}
      {/* <p>{props.state}</p> */}
      {/* </Group> */}

      <OuterContainer>
        <p>Detalii rezervare</p>
        <CustomInput type='input' placeholder={'data'} />
        <CustomInput type='input' placeholder={'interval'} />
        <CustomInput type='input' placeholder={'motiv'} />
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
      </OuterContainer>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  border: none;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
  max-height: 200px;
  min-height: 175px;

  background-color: rgba(93.3%, 93.3%, 93.3%, 0.25);
  color: $2c2c2c;

  border-radius: 10px;
  padding: 10px;
  padding-right: 100px;
  margin-right: 145px;
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
  }
  padding: 4px;
`;

const OuterContainer = styled.div`
  border: none;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

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
`;
