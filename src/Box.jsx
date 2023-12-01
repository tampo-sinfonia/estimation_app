import React from 'react';
import styled from 'styled-components';

const BoxContainer = styled.div`
  padding: ${(props) => (props.padding === 'p-4' ? '1rem' : '0')};
  background-color: ${(props) => (props.backgroundColor === '背景色1' ? '#f3f5f8' : 'white')};
  border: ${(props) => props.borderWidth} solid;
`;

export const Box = ({
  padding = 'p-0',
  backgroundColor = '背景色なし',
  borderWidth = '0px',
  styles,
  children,
}) => {
  return (
    <BoxContainer
      padding={padding}
      backgroundColor={backgroundColor}
      borderWidth={borderWidth}
      style={styles}
    >
      {children}
    </BoxContainer>
  );
};

export default Box;