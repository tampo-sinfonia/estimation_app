import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Form from './Form.jsx'

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
        <Routes>
          <Route path="/estimation" element={<Form />} />
          <Route path="/estimation/complete" element={<EstimationComplete />} />
        </Routes>
      </Router>
      <Footer />
    </AppContainer>
  )
}

export default App;

const EstimationCompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const EstimationCompleteTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const EstimationCompleteText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const EstimationCompleteButton = styled.button`
  width: 300px;
  height: 40px;
  border-radius: 4px;
  border: none;
  background-color: #1e90ff;
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

import { useNavigate } from 'react-router-dom';

function EstimationComplete() {
  const navigate = useNavigate();
  return (
    <EstimationCompleteContainer>
      <EstimationCompleteTitle>見積もり依頼を受け付けました</EstimationCompleteTitle>
      <EstimationCompleteButton onClick={() => navigate('/')}>トップに戻る</EstimationCompleteButton>
    </EstimationCompleteContainer>
  );
}