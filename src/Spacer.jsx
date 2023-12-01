import styled from 'styled-components';

const Spacer = styled.div`
  display: block;
  width: ${props => props.axis === 'vertical' ? '1px' : props.size};
  min-width: ${props => props.axis === 'vertical' ? '1px' : props.size};
  height: ${props => props.axis === 'horizontal' ? '1px' : props.size};
  min-height: ${props => props.axis === 'horizontal' ? '1px' : props.size};
  border: ${props => props.border ? '1px solid #000' : 'none'};
`;

export default Spacer;