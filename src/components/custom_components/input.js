import React from 'react';
import styled from 'styled-components';

const CustomInput = props => {
  return <StyledInput {...props} />;
};

export default CustomInput;

const StyledInput = styled.input`
  border: 1px solid rgba(93.3%, 93.3%, 93.3%, 0.25);
  outline: none;

  background-color: rgba(93.3%, 93.3%, 93.3%, 0.25);
  color: $2c2c2c;

  border-radius: 7px;

  padding: 15px 10px;
  margin: 10px;

  font-weight: normal;

  font-family: 'Assistant';
`;
