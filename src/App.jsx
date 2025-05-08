import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AboutUs from "./pages/AboutUs";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Signup from "./pages/Signup"; // ✅ Import Signup

import { AuthProvider } from "./context/AuthContext"; // ✅ Wrap app in AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-amber-50 flex flex-col">
          <Navbar />

          <div className="flex-grow pb-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/wishlist" element={<Wishlist />} />

            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
