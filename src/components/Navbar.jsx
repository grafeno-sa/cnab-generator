import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px', background: '#f4f4f4' }}>
      <Link to="/cnab-generator/" style={{ margin: '0 10px' }}>Gerar CNAB</Link>
      <Link to="/cnab-generator/csv" style={{ margin: '0 10px' }}>Gerar CSV</Link>
    </nav>
  );
}

export default Navbar;