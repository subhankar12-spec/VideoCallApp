import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './views/Homepage/Homepage';
import Callpage from './views/Callpage/Callpage';

import Navig from './components/Nav/Navig';
import InterviewerRegister from './AuthenticationPages/SignupPages/InterviewerRegister';
import IntervieweeRegister from './AuthenticationPages/SignupPages/IntervieweeRegister';
import LoginPage from './AuthenticationPages/LoginPages/LoginPage';
// import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Navig />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:id" element={<Callpage />} />
        <Route path="/registerPage" element={<InterviewerRegister />} />
        <Route path="/register" element={<IntervieweeRegister />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
