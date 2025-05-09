import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const defaultWhatsappNumber = import.meta.env.VITE_PHONE_NUMBER_WITH_COUNTRY;

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [whatsappFormProduct, setWhatsappFormProduct] = useState(null);
  const [formData, setFormData] = useState({ quantity: "", message: "" });

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) return;

      try {
        const wishlistRef = collection(db, "users", user.uid, "wishlist");
        const snapshot = await getDocs(wishlistRef);
        const wishlistIds = snapshot.docs.map(doc => doc.id);

        const productPromises = wishlistIds.map(async (id) => {
          const productDoc = await getDoc(doc(db, "products", id));
          if (productDoc.exists()) {
            return { id, ...productDoc.data() };
          } else {
            return null;
          }
        });

        const resolvedProducts = await Promise.all(productPromises);
        setWishlistItems(resolvedProducts.filter(Boolean));
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const confirmRemove = (productId) => {
    setSelectedProductId(productId);
    setShowConfirm(true);
  };

  const handleRemoveConfirmed = async () => {
    if (!user || !selectedProductId) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "wishlist", selectedProductId));
      setWishlistItems(prev => prev.filter(item => item.id !== selectedProductId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    } finally {
      setShowConfirm(false);
      setSelectedProductId(null);
    }
  };

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

  if (!user) {
    return <div className="p-8 text-center text-gray-600">Please log in to view your wishlist.</div>;
  }

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading wishlist...</div>;
  }

  return (
    <div className="min-h-screen bg-amber-50 py-6 px-4 sm:px-8 lg:px-24 relative">
      {/* Top Section - Left Aligned */}
      <div className="mb-8">
        <h1 className="text-4xl font-head font-bold text-yellow-600 border-b-4 border-amber-200 pb-2 w-fit">
          About Hansraj Industries
        </h1>
        <p className="text-gray-600 font-small mt-1">Browse your saved items here.</p>
      </div>

      {/* Wishlist Content */}
      {wishlistItems.length === 0 ? (
        <div className="text-gray-600 text-center bg-white p-6 font-small rounded shadow">Your wishlist is empty.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map(product => (
            <div key={product.id} className="bg-white border rounded-lg shadow-md hover:shadow-lg transition relative">
              <Link to={`/product/${product.id}`} className="block">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4 font-small ">
                  <h2 className="text-md font-semibold text-amber-900 line-clamp-1">{product.name}</h2>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                </div>
              </Link>

              {/* Wishlist Remove Icon */}
              <button
                onClick={() => confirmRemove(product.id)}
                className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:scale-110 transition"
                title="Remove from Wishlist"
              >
                <Heart className="text-red-600 fill-red-500 w-5 h-5" />
              </button>

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
                    setWhatsappFormProduct(whatsappFormProduct === product.id ? null : product.id)
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
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-20">
          <div className="bg-white p-6 rounded-xl shadow-xl border max-w-sm w-full text-center pointer-events-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Remove from Wishlist?</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to remove this item from your wishlist?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRemoveConfirmed}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
