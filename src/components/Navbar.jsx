import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className="container">
        <div className="row row-reverse w-100">
          <Link to="/"
                className='btn btn-link'>Gerar CNAB</Link>
          <Link to="/csv"
                className='btn btn-link'>Gerar CSV</Link>
          <Link to="/validate"
                className='btn btn-link'>Validar CNAB 400/444</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;