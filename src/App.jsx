import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Form from './Form.jsx'
import Box from './Box.jsx'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function App() {
  return (
      <Box backgroundColor="背景色1">
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
      </Box>
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

const EstimationCompleteButton = styled.a`
  width: 300px;
  height: 40px;
  border-radius: 4px;
  border: none;
  background-color: #51C707;
  color: white;
  font-size: 16px;
  font-weight: bold;
  display: inline-block;
  text-decoration: none;
  text-align: center;
  line-height: 40px;
`;

function EstimationComplete() {
  return (
    <EstimationCompleteContainer>
      <EstimationCompleteTitle>見積もり依頼を受け付けました</EstimationCompleteTitle>
      <EstimationCompleteButton href="https://sinfonia.biz/">トップに戻る</EstimationCompleteButton>
    </EstimationCompleteContainer>
  );
}