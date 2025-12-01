import { Routes, Route } from 'react-router-dom';

import Cnab from './pages/Cnab';
import Csv from './pages/Csv';
import Cnab400Validator from './pages/Cnab400Validator';

import './App.css'
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Cnab />} />
        <Route path="/csv" element={<Csv />} />
        <Route path="/validate" element={<Cnab400Validator />} />
      </Route>
    </Routes>
  );
}

export default App
