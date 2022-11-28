import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './views/Homepage/Homepage';
import Callpage from './views/Callpage/Callpage';

import Navig from './components/Nav/Navig';
// import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Navig />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:id" element={<Callpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
