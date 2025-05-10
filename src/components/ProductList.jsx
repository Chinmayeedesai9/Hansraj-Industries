import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useLocation } from "react-router-dom";
import { Heart, ChevronDown, ChevronUp, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const ProductList = () => {
  const { user } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [whatsappFormProduct, setWhatsappFormProduct] = useState(null);
  const [formData, setFormData] = useState({ quantity: "", message: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [categories, setCategories] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const defaultWhatsappNumber = import.meta.env.VITE_PHONE_NUMBER_WITH_COUNTRY;

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

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        const wishlistRef = collection(db, "users", user.uid, "wishlist");
        const snapshot = await getDocs(wishlistRef);
        const wishlistIds = snapshot.docs.map(doc => doc.id);
        setWishlist(wishlistIds);
      }
    };
    fetchWishlist();
  }, [user]);

  const handleCall = () => {
    window.location.href = `tel:${import.meta.env.VITE_PHONE_NUMBER}`;
  };

  const handleWhatsAppSubmit = (product) => {
    const phoneNumber = product.whatsappNumber || defaultWhatsappNumber;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      `Hello! I'm interested in:\nProduct: ${product.name}\nQuantity: ${formData.quantity}\nMessage: ${formData.message}`
    )}`;
    window.open(url, "_blank");
    setWhatsappFormProduct(null);
    setFormData({ quantity: "", message: "" });
  };

  const toggleWishlist = async (productId) => {
    if (!user) return;
    const wishlistRef = doc(db, "users", user.uid, "wishlist", productId);

    if (wishlist.includes(productId)) {
      await deleteDoc(wishlistRef);
      setWishlist(prev => prev.filter(id => id !== productId));
    } else {
      await setDoc(wishlistRef, { addedAt: Date.now() });
      setWishlist(prev => [...prev, productId]);
    }
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
    <div className="min-h-screen bg-amber-50">
      {/* Top Banner */}
      <div className="relative w-full h-72">
        <img
          src="/Hansind.png"
          alt="Banner Desktop"
          className="w-full h-full object-cover hidden sm:block"
        />
        <img
          src="/phoneprod.png"
          alt="Banner Mobile"
          className="w-full h-full object-cover block sm:hidden"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row mt-8 gap-6 px-4">
        {/* Categories */}
        <div className="w-full md:w-[16%] bg-white p-4 shadow border self-start">
          {/* Toggle Button for Mobile */}
          <div className="flex justify-between items-center md:hidden mb-2">
            <h3 className="text-lg font-semibold font-head text-gray-800">Categories</h3>
            <button onClick={() => setShowCategories(prev => !prev)} className="text-gray-600">
              {showCategories ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>

          {/* Category List */}
          {(showCategories || window.innerWidth >= 768) && (
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`w-full text-left font-small rounded-lg px-2 py-1 transition ${
                    selectedCategory === "All"
                      ? "bg-yellow-200 text-yellow-900 font-bold"
                      : "hover:bg-amber-100 text-gray-700"
                  }`}
                >
                  All
                </button>
              </li>
              {categories.map((cat, index) => (
                <li key={index}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left font-small rounded-lg px-2 py-1 transition ${
                      selectedCategory === cat
                        ? "bg-yellow-200 text-yellow-900 font-bold"
                        : "hover:bg-amber-100 text-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-[84%]">
          {/* Search Bar */}
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="What product are you looking for?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-10"
            />
            <Search className="absolute right-3 top-3 text-gray-500" size={20} />
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <p className="text-gray-600 col-span-full text-center bg-white py-4 rounded shadow">
                No products found.
              </p>
            ) : (
              filteredProducts.map(product => (
                <div key={product.id} className="bg-white border font-small rounded-lg shadow-md hover:shadow-lg transition relative">
                  <Link to={`/product/${product.id}`} className="block">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h2 className="text-md font-semibold text-amber-900 line-clamp-1">{product.name}</h2>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                    </div>
                  </Link>

                  {/* Wishlist Icon */}
                  {user && (
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:scale-110 transition"
                      title={wishlist.includes(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      {wishlist.includes(product.id) ? (
                        <Heart className="text-red-600 fill-red-500"/>
                      ) : (
                        <Heart className="text-red-500 w-5 h-5" />
                      )}
                    </button>
                  )}

                  {/* Call + Chat Buttons */}
                  <div className="flex gap-2 px-4 pb-4">
                    <button
                      onClick={handleCall}
                      className="flex-1 py-2 bg-emerald-600 text-white text-sm text-center rounded-md hover:bg-emerald-700"
                    >
                      📞 Call
                    </button>
                    <button
                      onClick={() =>
                        setWhatsappFormProduct(
                          whatsappFormProduct === product.id ? null : product.id
                        )
                      }
                      className="flex-1 py-2 bg-sky-900 text-white text-sm rounded-md hover:bg-sky-950"
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
                          className="w-full py-2 bg-sky-900 text-white text-sm hover:bg-sky-950 rounded"
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
