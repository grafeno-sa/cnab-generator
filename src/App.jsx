import { Routes, Route } from 'react-router-dom';

import Cnab from './pages/Cnab';
import Csv from './pages/Csv';

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/cnab-generator" element={<Cnab />} />
      <Route path="/cnab-generator/csv" element={<Csv />} />
    </Routes>
  );
}

export default App
