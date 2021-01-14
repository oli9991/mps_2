import React from 'react';
import styled from 'styled-components';

const CustomButton = props => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default CustomButton;

const StyledButton = styled.button`
  border: none;
  outline: none;

  background-color: #eeeeee;
  color: $2c2c2c;

  border-radius: 10px;

  padding: 20px 30px;

  font-weight: normal;

  cursor: pointer;
  font-family: 'Assistant';
`;
