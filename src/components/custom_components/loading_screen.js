import React from 'react';
import { Spin } from 'antd';
import { StarFilled } from '@ant-design/icons';
import styled from 'styled-components';

const Loading = () => {
  const antIcon = <StarFilled style={{ fontSize: 24, color: 'yellow' }} spin />;

  return (
    <Container>
      <Spin indicator={antIcon} />
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.5);
  color: yellow;
  z-index: 11;

  display: flex;
  justify-content: center;
  align-items: center;
`;
