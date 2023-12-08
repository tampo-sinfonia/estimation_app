import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  padding: 20px;
  width: 100%;
  position: sticky;
  bottom: 0;
  margin-top: auto;
`;

const FooterText = styled.p`
  color: #6c757d;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterText>Copyrightⓒ Sinfonia Inc. All Rights Reserved.</FooterText>
    </FooterContainer>
  );
}

export default Footer;