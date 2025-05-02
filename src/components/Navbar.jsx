import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    setIsOpen(false);
    navigate("/"); // Redirect to home page
  };

  const getFirstName = () => {
    if (user?.displayName) return user.displayName.split(" ")[0];
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  const navLinks = (
    <>
      <Link to="/" className="text-slate-700 hover:text-yellow-600 transition">
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
      {user && (
        <Link
          to="/wishlist"
          className="text-slate-700 hover:text-yellow-600 transition"
        >
          Wishlist
        </Link>
      )}
      {isAdmin && (
        <Link
          to="/admin"
          className="text-slate-700 hover:text-red-600 transition"
        >
          Admin Panel
        </Link>
      )}
      {user ? (
        <>
          <span className="text-slate-700">Welcome, {getFirstName()}!</span>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="text-slate-700 hover:text-red-600 transition"
        >
          Login
        </Link>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md border-b border-yellow-600">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
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

        <div className="hidden md:flex space-x-6 text-base font-medium">
          {navLinks}
        </div>

        <button
          className="md:hidden text-slate-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-base font-medium">
          {navLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;