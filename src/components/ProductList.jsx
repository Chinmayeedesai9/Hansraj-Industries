import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [whatsappFormProduct, setWhatsappFormProduct] = useState(null);
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
Product: ${product.name}
Quantity: ${formData.quantity}
Message: ${formData.message}`
    )}`;
    window.open(url, "_blank");
    setWhatsappFormProduct(null);
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
    <div className="min-h-screen bg-neutral-100">
      {/* Banner */}
      <div className="w-full">
        <img
          src="/Hansind.jpg"
          alt="Banner"
          className="w-full object-cover h-72"
        />
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row mt-8 gap-6 px-4">
        {/* Category Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow border self-start">

          <h3 className="text-lg font-semibold mb-4 text-gray-800">Categories</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedCategory("All")}
                className={`w-full text-left px-2 py-1 rounded transition ${
                  selectedCategory === "All"
                    ? "bg-blue-100 text-blue-700 font-bold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                All
              </button>
            </li>
            {categories.map((cat, index) => (
              <li key={index}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-2 py-1 rounded transition ${
                    selectedCategory === cat
                      ? "bg-blue-100 text-blue-700 font-bold"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Products Section */}
        <div className="w-full md:w-3/4">
          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <p className="text-gray-600 col-span-full text-center bg-white py-4 rounded shadow">
                No products found.
              </p>
            ) : (
              filteredProducts.map(product => (
                <div key={product.id} className="bg-white border rounded-lg shadow-md hover:shadow-lg transition">
                  <Link to={`/product/${product.id}`} className="block">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h2 className="text-md font-semibold text-green-800 line-clamp-1">{product.name}</h2>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                    </div>
                  </Link>

                  {/* Action Buttons */}
                  <div className="flex gap-2 px-4 pb-4">
                    <button
                      onClick={() => {
                        const number = import.meta.env.VITE_CALL_NUMBER;
                        if (window.confirm(`Do you want to call ${number}?`)) {
                          window.location.href = `tel:${number}`;
                        }
                      }}
                      className="flex-1 py-2 bg-green-500 text-white text-sm text-center rounded-md hover:bg-green-600"
                    >
                      📞 Call
                    </button>
                    <button
                      onClick={() =>
                        setWhatsappFormProduct(
                          whatsappFormProduct === product.id ? null : product.id
                        )
                      }
                      className="flex-1 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                    >
                      💬 Chat
                    </button>
                  </div>

                  {/* WhatsApp Form */}
                  {whatsappFormProduct === product.id && (
                    <div className="px-4 pb-4">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 space-y-2">
                        <input
                          type="text"
                          placeholder="Quantity"
                          value={formData.quantity}
                          onChange={(e) =>
                            setFormData({ ...formData, quantity: e.target.value })
                          }
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                        <textarea
                          placeholder="Message"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                        <button
                          onClick={() => handleWhatsAppSubmit(product)}
                          className="w-full py-2 bg-blue-600 text-white text-sm hover:bg-blue-700 rounded"
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
      </div>
    </div>
  );
};

export default ProductList;
