import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate, useLocation } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    setIsOpen(false);
    navigate("/");
  };

  const getFirstName = () => {
    if (user?.displayName) return user.displayName.split(" ")[0];
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  const linkClasses = (path) =>
    `transition hover:text-emerald-700 ${
      location.pathname === path ? "text-sky-900 font-semibold" : "text-slate-700"
    }`;

  const navLinks = (
    <>
      <Link to="/" className={linkClasses("/")}>
        Home
      </Link>
      <Link to="/products" className={linkClasses("/products")}>
        Our Products
      </Link>
      <Link to="/about" className={linkClasses("/about")}>
        About Us
      </Link>
      {user && (
        <Link to="/wishlist" className={linkClasses("/wishlist")}>
          Wishlist
        </Link>
      )}
      {isAdmin && (
        <Link to="/admin" className={linkClasses("/admin") + " hover:text-red-600"}>
          Admin Panel
        </Link>
      )}
      {user ? (
        <>
          <span className="bg-sky-100 text-sky-900 px-3 py-1 rounded-full text-sm font-semibold">
            Welcome, {getFirstName()}!
          </span>
          <div className="relative group cursor-pointer">
            <LogOut
              size={22}
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700"
            />
            <span className="absolute left-1/2 -translate-x-1/2 mt-1 w-max text-xs text-white bg-slate-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Logout
            </span>
          </div>

        </>
      ) : (
        <Link
          to="/login"
          className="border border-slate-700 bg-slate-700 text-white px-3 py-1 rounded hover:bg-white hover:text-slate-700 transition"
        >
          Login
        </Link>

      )}
    </>
  );

  return (
    <nav className="bg-white shadow-md border-b border-sky-600">
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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-base font-medium">
          {navLinks}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-800 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 pt-2 space-y-3 text-base font-medium flex flex-col">
          {navLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
