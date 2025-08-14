// router/pages/Layout.jsx
import { Outlet, Link } from "react-router-dom";

const Layout = () => (
  <>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blogs">Blogs</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/books">Books</Link></li> {/* ← add link */}
      </ul>
    </nav>
    <Outlet />
  </>
);

export default Layout;
