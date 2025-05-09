import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


const AboutUs = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const highlights = [
    { src: "/images/unit.jpg", title: "Manufacturing Unit" },
    { src: "/images/warehouse.jpg", title: "Our Warehouse" },
    { src: "/images/machine.jpg", title: "Our Machinery" },
  ];

  const galleryImages = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
    "/images/gallery5.jpg",
    "/images/gallery6.jpg",
    "/images/gallery7.jpg",
    "/images/gallery8.jpg",
    "/images/gallery9.jpg",
    "/images/gallery10.jpg",
    "/images/gallery11.jpg",
    "/images/gallery12.jpg",
    "/images/gallery13.jpg",
    "/images/gallery14.jpg",
    "/images/gallery15.jpg",
  ];

  const products = [
    "Others",
    "Copper Flexible Connectors",
    "EOT Crane Insulators",
    "DMC Electrical Insulator",
    "DMC Electrical Insulators",
    "Current Collector Assembly",
    "Current Collector Copper Shoe",
    "Material Handling Platform Trolleys",
    "Trolley For Engine Movement",
    "DMC Busbar Insulator",
    "Copper Flaxibile Shunt",
    "Engine Lifting Tackle",
    "Lifting Tackles Mechanical",
    "EOT Carbon Brush",
    "Industrial Lifting Tackles",
    "Tacho Carbon Brush",
    "DC Motor Carbon Brush",
    "Copper Bralded Flexible Connectors",
    "Flexible Copper Link",
  ];

  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER_WITH_COUNTRY;

  const handleSubmit = () => {
    if (!selectedProduct || !quantity) return;
    const message = `Hi, I'm interested in ${selectedProduct} (Quantity: ${quantity}).`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setShowPrompt(false);
    setSelectedProduct("");
    setQuantity("");
  };

  const filteredProducts = products.filter((product) =>
    product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-amber-50 px-4 sm:px-8 md:px-16 lg:px-24 py-16">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold font-head text-yellow-600 border-b-4 border-amber-200 pb-4">
          About Hansraj Industries
        </h1>

        {/* About & Quick Facts */}
        <div className="space-y-10">
          <div className="bg-white border font-small border-emerald-200 shadow p-6 space-y-6 rounded-xl">
            <p className="text-slate-700 leading-relaxed">
              <strong>Transform Enterprises / Rajhans Engineering Works / Hansraj Industries</strong> was established in <strong>1968</strong> in Pune, Maharashtra. We are a <strong>Proprietorship firm</strong>, known for manufacturing high-quality <em>Epoxy Insulators, Conveyor Belts, Dowels Pins, Earthing Strips</em> and other essential industrial components.
            </p>
            <p className="text-slate-700 leading-relaxed">
              With over five decades of excellence, we have built a legacy of precision, quality, and customer trust. Our facility is equipped with advanced machinery, and we ensure smooth supply through a well-maintained warehouse setup.
            </p>
          </div>

          <div className="bg-white border border-emerald-200 shadow p-6 rounded-xl">
            <h2 className="text-xl font-semibold font-head text-sky-900 mb-4">Quick Facts</h2>
            <div className="grid grid-cols-1 font-small sm:grid-cols-2 gap-4 text-slate-700">
              <ul className="list-disc pl-5 space-y-1">
                <li>Nature of Business: Manufacturer</li>
                <li>Additional Role: Factory / Manufacturing</li>
                <li>CEO: Kartik H Gowardhan</li>
                <li>Established: 1968</li>
              </ul>
              <ul className="list-disc pl-5 space-y-1">
                <li>Employees: 11 – 25 People</li>
                <li>Legal Status: Proprietorship</li>
                <li>GST Registered: Since 01-07-2017</li>
                <li>GST No: 27AFLPG6365A1ZK</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white border border-emerald-200 shadow p-6 rounded-xl">
            <h2 className="text-xl font-head font-semibold text-sky-900 mb-4">Our Mission</h2>
            <p className="text-slate-700 font-small leading-relaxed">
              To deliver dependable, durable, and high-performance industrial products with a commitment to innovation, consistency, and excellence.
            </p>
          </div>

          <div className="bg-white border border-emerald-200 shadow p-6 rounded-xl">
            <h2 className="text-xl font-semibold font-head text-sky-900 mb-4">Our Vision</h2>
            <p className="text-slate-700 font-small leading-relaxed">
              To be a leading manufacturer in the industrial components sector by continuously adapting to modern technologies while upholding our legacy of craftsmanship and integrity since 1968.
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white border border-emerald-200 shadow p-6 rounded-xl">
          <h2 className="text-xl font-semibold font-head text-sky-900 mb-4">Address</h2>
          <p className="text-slate-700 font-small">
            S No 54/3, Chovisawadi, Nashik Road, Chovisawadi, Pune, Moshi, Pimpri Chinchwad-412105, Maharashtra, India
          </p>
          <a
            href="https://www.google.co.in/maps/dir//18.65542,73.86711/@18.655402,73.7847083,12z?entry=ttu&g_ep=EgoyMDI1MDUwNS4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-small mt-4 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            Get Directions
          </a>
        </div>

        {/* Highlights */}
        <div className="py-12">
          <h2 className="text-2xl font-bold font-head text-sky-900 mb-8">Our Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden border border-emerald-200 shadow hover:shadow-lg transition">
                <img src={item.src} alt={item.title} className="h-100 w-full object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold font-small text-sky-900">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="py-12">
          <h2 className="text-2xl font-head font-bold text-sky-900 mb-8">Photo Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {galleryImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-44 object-cover rounded-lg shadow-sm hover:scale-105 transition cursor-pointer"
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              />
            ))}
          </div>
        </div>

        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={galleryImages.map((src) => ({ src }))}
            index={photoIndex}
            styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.85)" } }}
            on={{
              view: ({ index }) => setPhotoIndex(index),
            }}
          />
        )}



        {/* Contact Us */}
        <div className="bg-white border border-emerald-200 shadow p-6 rounded-xl">
          <h2 className="text-xl font-head font-semibold text-sky-900 mb-4">Tell us what you need, and we'll help you get quotes</h2>
          <button
            onClick={() => setShowPrompt(true)}
            className="bg-emerald-600 font-small text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition"
          >
            Submit Requirement
          </button>
        </div>

        {/* Popup Modal */}
        {showPrompt && (
          <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl border border-amber-200 relative">
              <button
                onClick={() => setShowPrompt(false)}
                className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                &times;
              </button>
              <h3 className="text-lg font-semibold font-head text-yellow-600 mb-4">Choose Product & Quantity</h3>
              <input
                type="text"
                placeholder="Search product"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full mb-3 p-2 border rounded-md"
              />
              <div className="max-h-40 overflow-y-auto border rounded-md mb-3">
                {filteredProducts.map((product, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedProduct(product)}
                    className={`p-2 cursor-pointer hover:bg-yellow-100 ${
                      selectedProduct === product ? "bg-yellow-200 font-medium" : ""
                    }`}
                  >
                    {product}
                  </div>
                ))}
              </div>
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 border rounded-md mb-3"
              />
              <button
                onClick={handleSubmit}
                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 w-full"
              >
                Send via WhatsApp
              </button>
            </div>
          </div>
        )}

        <div className="bg-emerald-100 border border-emerald-200 p-6 rounded-xl text-center">
          <p className="text-red-900 font-small font-medium text-lg">
            Thank you for choosing <strong>Hansraj Industries</strong> as your trusted manufacturing partner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
