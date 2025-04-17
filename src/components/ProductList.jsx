import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [whatsappForm, setWhatsappForm] = useState(null);
  const [formData, setFormData] = useState({ quantity: "", message: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      const categoryList = Array.from(new Set(data.map(item => item.category)));
      setCategories(categoryList);
    };
    fetchProducts();
  }, []);

  const handleWhatsAppSubmit = (product) => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      `Hello! I'm interested in:
\nProduct: ${product.name}
Quantity: ${formData.quantity}
Message: ${formData.message}`
    )}`;
    window.open(url, "_blank");
    setWhatsappForm(null);
    setFormData({ quantity: "", message: "" });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-zinc-300 p-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-6">
        Our Products
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name, description, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-2/3 p-3 border border-gray-300 bg-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-zinc-600"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-1/3 p-3 border border-gray-300 bg-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-zinc-600"
        >
          <option value="All">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-full text-gray-700 text-lg">No products found.</p>
        ) : (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-square border-b border-gray-200">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold line-clamp-1">{product.name}</h2>
                  <p className="text-stone-600 font-bold text-lg mt-1">₹{product.price} /Piece</p>
                  <p className="text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                </div>
              </Link>

              <div className="flex flex-col sm:flex-row gap-2 px-4 pb-4">
                <a
                  href={`tel:${import.meta.env.VITE_CALL_NUMBER}`}
                  className="flex-1 py-2 bg-emerald-600 text-white rounded-full text-center hover:bg-emerald-700 transition flex items-center justify-center"
                >
                  📞 Call us now
                </a>
                <button
                  onClick={() =>
                    setWhatsappForm(whatsappForm === product.id ? null : product.id)
                  }
                  className="flex-1 py-2 bg-stone-600 text-white rounded-full hover:bg-stone-700 transition flex items-center justify-center"
                >
                  💬 Text us on WhatsApp
                </button>
              </div>

              {whatsappForm === product.id && (
                <div className="px-4 pb-4">
                  <div className="mt-3 p-3 border rounded-xl bg-gray-100 space-y-2">
                    <input
                      type="text"
                      placeholder="Enter Quantity"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    />
                    <textarea
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    />
                    <button
                      onClick={() => handleWhatsAppSubmit(product)}
                      className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Send on WhatsApp
                    </button>
                  </div>
                </div>
              )}

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
