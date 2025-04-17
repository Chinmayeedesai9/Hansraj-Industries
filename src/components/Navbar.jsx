// components/Navbar.jsx

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 border-b border-yellow-600">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Left side - Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-slate-800 hover:text-yellow-600 transition"
        >
          🏭 Hansraj Industries
        </Link>

        {/* Right side - Links */}
        <div className="space-x-6 text-base font-medium">
          <Link
            to="/"
            className="text-slate-700 hover:text-yellow-600 transition"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-slate-700 hover:text-yellow-600 transition"
          >
            Our Products
          </Link>
          <Link
            to="/about"
            className="text-slate-700 hover:text-yellow-600 transition"
          >
            About Us
          </Link>
          <Link
            to="/admin"
            className="text-slate-700 hover:text-red-600 transition"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
