import { Routes, Route } from 'react-router-dom';

import Cnab from './pages/Cnab';
import Csv from './pages/Csv';

import './App.css'
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path="/cnab-generator" element={<Cnab />} />
        <Route path="/cnab-generator/csv" element={<Csv />} />
      </Route>
    </Routes>
  );
}

export default App
