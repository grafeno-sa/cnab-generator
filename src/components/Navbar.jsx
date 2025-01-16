import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className="container">
        <div className="row row-reverse w-100">
          <Link to="/cnab-generator/"
                className='btn btn-link'>Gerar CNAB</Link>
          <Link to="/cnab-generator/csv"
                className='btn btn-link'>Gerar CSV</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;