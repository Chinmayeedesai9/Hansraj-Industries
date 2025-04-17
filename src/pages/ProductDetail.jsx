import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
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

  if (!product) return <div className="p-10 text-center text-xl text-emerald-600">Loading...</div>;

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
    <div className="min-h-screen w-full bg-zinc-300 px-4 py-10 flex flex-col items-center">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image Gallery */}
        <div className="flex flex-col sm:flex-row gap-4">
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
            className="block"
          >
            <img
              src={product.images?.[activeImageIndex]}
              alt={product.name}
              className="rounded-2xl max-h-[600px] w-full object-contain cursor-zoom-in"
            />
          </a>


            {/* Arrows */}
            <button
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev === 0 ? product.images.length - 1 : prev - 1
                )
              }
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 text-xl font-bold hover:bg-emerald-100"
            >
              {"<"}
            </button>
            <button
              onClick={() =>
                setActiveImageIndex((prev) =>
                  prev === product.images.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow p-2 text-xl font-bold hover:bg-emerald-100"
            >
              {">"}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6 w-full">
          <div>
            <h1 className="text-4xl font-extrabold text-emerald-700 mb-2">{product.name}</h1>
            <span className="inline-block bg-emerald-200 text-emerald-800 text-sm px-3 py-1 rounded-full shadow-sm">
              🏷️ Category: {product.category}
            </span>
          </div>

          {/* Price */}
          <div>
            <h3 className="font-semibold text-xl text-slate-800">💰 Price:</h3>
            <p className="text-2xl font-bold text-emerald-700">₹{product.price}</p>
          </div>

          <p className="text-slate-800 text-lg leading-relaxed">{product.description}</p>

          <div>
            <h3 className="font-semibold text-xl text-slate-800 mb-1">📋 Specifications:</h3>
            <p className="text-slate-700 whitespace-pre-line border border-zinc-400 p-4 rounded-xl bg-zinc-100 shadow-sm">
              {product.specifications}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={handleCall}
              className="bg-emerald-600 text-white px-6 py-3 rounded-full shadow hover:bg-emerald-700 transition duration-300"
            >
              📞 Call us now
            </button>
            <button
              onClick={() => setShowWhatsappForm(!showWhatsappForm)}
              className="bg-slate-800 text-white px-6 py-3 rounded-full shadow hover:bg-slate-900 transition duration-300"
            >
              💬 Text us on WhatsApp
            </button>
          </div>

          {/* WhatsApp Form */}
          {showWhatsappForm && (
            <div className="mt-6 p-6 border border-zinc-400 rounded-2xl bg-white shadow-md animate-fade-in space-y-4">
              <h4 className="text-lg font-semibold text-slate-700">Send a WhatsApp Message</h4>
              <input
                type="text"
                placeholder="Enter Quantity"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                className="w-full p-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              <textarea
                placeholder="Enter your message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              <button
                onClick={handleWhatsAppSubmit}
                className="w-full px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition duration-300"
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
