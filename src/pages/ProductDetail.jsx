import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Heart } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
  

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [showWhatsappForm, setShowWhatsappForm] = useState(false);
  const [formData, setFormData] = useState({ quantity: "", message: "" });
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        const snapshot = await getDocs(collection(db, "users", user.uid, "wishlist"));
        const wishlistIds = snapshot.docs.map(doc => doc.id);
        setWishlist(wishlistIds);
      }
    };
    fetchWishlist();
  }, [user]);

  const isWishlisted = wishlist.includes(id);

  const toggleWishlist = async () => {
    if (!user) return;

    const wishlistRef = doc(db, "users", user.uid, "wishlist", id);
    if (isWishlisted) {
      await deleteDoc(wishlistRef);
      setWishlist(prev => prev.filter(itemId => itemId !== id));
    } else {
      await setDoc(wishlistRef, { addedAt: Date.now() });
      setWishlist(prev => [...prev, id]);
    }
  };

  if (!product) {
    return <div className="p-10 text-center text-xl text-emerald-600">Loading...</div>;
  }

  const handleCall = () => {
    window.location.href = `tel:${import.meta.env.VITE_PHONE_NUMBER}`;
  };

  const handleWhatsAppSubmit = () => {
    const message = encodeURIComponent(
      `Hello! I'm interested in:\n\nProduct: ${product.name}\nQuantity: ${formData.quantity}\nMessage: ${formData.message}`
    );
    window.open(
      `https://wa.me/${import.meta.env.VITE_PHONE_NUMBER_WITH_COUNTRY}?text=${message}`,
      "_blank"
    );
    setShowWhatsappForm(false);
    setFormData({ quantity: "", message: "" });
  };

  return (
    <div className="min-h-screen w-full bg-amber-50 px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image Gallery */}
        <div className="flex flex-col sm:flex-row gap-4 relative">
          {/* Wishlist Icon */}
          {user && (
            <button
              onClick={toggleWishlist}
              className="absolute top-0 right-0 z-10 m-2 p-2 bg-white rounded-full shadow-md hover:bg-red-100 transition"
            >
              {isWishlisted ? (
                <Heart className="text-red-600 fill-red-500" />
              ) : (
                <Heart className="text-zinc-600" />
              )}
            </button>
          )}

          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-2 max-h-[500px] overflow-y-auto pr-2">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setActiveImageIndex(index)}
                className={`w-20 h-20 object-cover border-2 rounded-xl cursor-pointer transition ${
                  activeImageIndex === index
                    ? "border-emerald-500 ring-2 ring-emerald-300"
                    : "border-zinc-400"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="relative w-full flex justify-center items-center min-h-[600px]">
            <a
              href={product.images?.[activeImageIndex]}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <img
                src={product.images?.[activeImageIndex]}
                alt={product.name}
                className="rounded-xl border-4 border-zinc-300 max-h-[600px] w-full object-contain cursor-zoom-in"
              />
            </a>

            {/* Arrows */}
            <button
            onClick={() =>
              setActiveImageIndex((prev) =>
                prev === 0 ? product.images.length - 1 : prev - 1
              )
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-2 hover:bg-emerald-200 transition"
            aria-label="Previous Image"
          >
            <ChevronLeft className="text-emerald-700 w-6 h-6" />
          </button>

          <button
            onClick={() =>
              setActiveImageIndex((prev) =>
                prev === product.images.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-2 hover:bg-emerald-200 transition"
            aria-label="Next Image"
          >
            <ChevronRight className="text-emerald-700 w-6 h-6" />
          </button>

          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6 w-full">
          <div>
            <h1 className="text-4xl font-extrabold font-head text-emerald-700 mb-2">{product.name}</h1>
            <span className="inline-block bg-emerald-200 font-small text-emerald-800 text-sm px-3 py-1 rounded-full shadow-sm">
              🏷️ Category: {product.category}
            </span>
          </div>

          {/* Price */}
          <div className="font-head">
            <h3 className="font-semibold text-xl text-slate-800">Price:</h3>
            <p className="text-2xl font-bold text-emerald-700">₹{product.price}</p>
          </div>

          <p className="text-slate-800 font-small text-lg leading-relaxed">{product.description}</p>

          <div>
            <h3 className="font-semibold text-xl font-head text-slate-800 mb-1">📋 Specifications:</h3>
            <div className="text-slate-700 font-small whitespace-pre-line border border-zinc-400 p-4 rounded-md bg-white shadow">
              {product.specifications}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={handleCall}
              className="bg-emerald-700 text-white px-6 py-3 rounded-lg shadow hover:bg-emerald-800 transition duration-300"
            >
              📞 Call us now
            </button>
            <button
              onClick={() => setShowWhatsappForm(!showWhatsappForm)}
              className="bg-sky-900 text-white px-6 py-3 rounded-lg shadow hover:bg-sky-950 transition duration-300"
            >
              💬 Text us on WhatsApp
            </button>
          </div>

          {/* WhatsApp Form */}
          {showWhatsappForm && (
            <div className="mt-6 p-6 border border-zinc-400 rounded-xl bg-white shadow-md animate-fade-in space-y-4">
              <h4 className="text-lg font-semibold text-slate-700">Send a WhatsApp Message</h4>
              <input
                type="text"
                placeholder="Enter Quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="w-full p-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              <textarea
                placeholder="Enter your message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              <button
                onClick={handleWhatsAppSubmit}
                className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition duration-300"
              >
                📤 Send on WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
