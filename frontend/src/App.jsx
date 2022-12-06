import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './views/Homepage/Homepage';
import Callpage from './views/Callpage/Callpage';

import Navig from './components/Nav/Navig';
import InterviewerRegister from './views/AuthenticationPages/SignupPages/InterviewerRegister';
import IntervieweeRegister from './views/AuthenticationPages/SignupPages/IntervieweeRegister';
import LoginPage from './views/AuthenticationPages/LoginPages/LoginPage';
import UserLandingPage from './views/protectedPages/UserLandingPage';
import ProtectedRoute from './views/protectedPages/ProtectedRoutes';
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
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <UserLandingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
