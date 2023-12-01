import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react'
import styled from 'styled-components'
import Header from './Header.jsx'
import Footer from './Footer.jsx' // 追加
import Form from './Form.jsx' // 追加

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <Router>
        <Form />
      </Router>
      <Footer />
    </AppContainer>
  )
}

export default App;