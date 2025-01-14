import { Routes, Route } from 'react-router-dom';

import Cnab from './pages/Cnab';

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/cnab-generator" element={<Cnab />} />
    </Routes>
  );
}

export default App
