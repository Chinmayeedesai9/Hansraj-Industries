import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md border-b border-yellow-600">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/rajhanslogo.png"
            alt="Hansraj Industries Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="text-xl sm:text-2xl font-extrabold text-slate-800 hover:text-yellow-600 transition">
            Hansraj Industries
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-base font-medium">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-base font-medium">
          <Link
            to="/"
            className="block text-slate-700 hover:text-yellow-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block text-slate-700 hover:text-yellow-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Our Products
          </Link>
          <Link
            to="/about"
            className="block text-slate-700 hover:text-yellow-600 transition"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/admin"
            className="block text-slate-700 hover:text-red-600 transition"
            onClick={() => setIsOpen(false)}
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
