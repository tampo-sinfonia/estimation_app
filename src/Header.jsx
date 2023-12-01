import React from 'react';
import styled from 'styled-components';
import logo from './sfn_logo.svg';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between; // ロゴとタイトルを両端に配置
  align-items: center;
  background-color: white;
  padding: 10px;
  color: white;
  width: 100%;
`;

const Logo = styled.img`
  height: 36px;
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo src={logo} alt="Logo" />
    </HeaderContainer>
  );
}

export default Header;