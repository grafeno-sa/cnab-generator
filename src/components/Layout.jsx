import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <div className="container mt-3">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;