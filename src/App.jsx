// App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AdminPage from "./pages/AdminPage";
import ProductDetail from "./pages/ProductDetail";
import AboutUs from "./pages/AboutUs"; // <- Add this import

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutUs />} /> {/* New About Us route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
