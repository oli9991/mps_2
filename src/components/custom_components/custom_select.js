import React from 'react';
import styled from 'styled-components';

const CustomSelect = props => {
  return (
    <>
      <label>{props.placeholder}</label>
      <StyledSelect {...props}>{props.children}</StyledSelect>
    </>
  );
};

export default CustomSelect;

const StyledSelect = styled.select`
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
