import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Carbon Brush",
    image: "https://res.cloudinary.com/dhyjsiyt8/image/upload/v1744627193/dpkvd8n8uk2oiixfzova.jpg",
    count: "3 products available",
  },
  {
    name: "Copper Connectors",
    image: "https://res.cloudinary.com/dhyjsiyt8/image/upload/v1744641303/yfekdonle0ogozd7khfv.jpg",
    count: "3 products available",
  },
  {
    name: "Lifting Tackles",
    image: "https://res.cloudinary.com/dhyjsiyt8/image/upload/v1744630146/gqipg4pua9os4xtqesqm.jpg",
    count: "3 products available",
  },
  {
    name: "DMC Insulator",
    image: "https://res.cloudinary.com/dhyjsiyt8/image/upload/v1744641907/suvxgaehdukvgu0yqlgz.jpg",
    count: "3 products available",
  },
  {
    name: "Current Collector",
    image: "https://res.cloudinary.com/dhyjsiyt8/image/upload/v1744642541/iufvadbrkoqwgixvfitd.jpg",
    count: "2 products available",
  },
  {
    name: "Material Handling Trolley",
    image: "https://res.cloudinary.com/dhyjsiyt8/image/upload/v1744714698/p1ad2kppjcw3wmoiydld.jpg",
    count: "2 products available",
  },
];

const clients = ["Tata", "Tech Mahindra", "xyz", "abc", "321", "123"];

const Home = () => {
  const scrollRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const scrollAmount = 360;
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

        if (scrollRef.current.scrollLeft + scrollAmount >= maxScroll) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
      <div className="w-full bg-amber-50">
  {/* Hero Banner */}
        <div
          className="relative w-full h-[90vh] bg-center bg-cover"
          style={{ backgroundImage: "url('/Hansrajbg.png')" }}
        >
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center md:justify-start md:items-start text-left px-6 md:pl-[200px] pt-0 md:pt-48">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-name text-white drop-shadow-lg">
                Hansraj Industries
              </h1>
              <p className="mt-4 text-lg md:text-xl font-head text-zinc-200 max-w-xl mx-auto md:mx-0">
                Established in the year 1968 at Pune, Maharashtra.
              </p>
              <Link
                to="/products"
                className="inline-block mt-6 px-8 py-3 text-lg font-small text-white bg-emerald-600 hover:bg-yellow-700 transition"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>


      {/* Brand Summary Section */}
      <section className="px-6 py-20 sm:px-10 lg:px-20 bg-amber-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Box 1: Image container (increased height + border) */}
          <div className="md:col-span-2 border-rounded-lg border-2 border-yellow-700 rounded-lg bg-stone-50">
            <img
              src="/bannerlogo.png"
              alt="50 Years of Legacy"
              className="w-full h-full object-contain rounded-xl min-h-[300px] shadow"
            />
          </div>

          {/* Box 2: Heading + Paragraph (with padding + thick border) */}
          <div
            className="md:row-span-2 relative flex flex-col items-center justify-center text-center md:text-left md:items-start p-6 min-h-[560px] rounded-lg shadow overflow-hidden"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ backgroundImage: "url('/bghero.png')" }}
            ></div>

            {/* Dark Overlay */}

            {/* Content */}
            <div className="relative z-20 text-white">
              <h2 className="text-3xl font-head font-bold mb-4">
                Over 50 Years of Trusted Engineering
              </h2>
              <p className="max-w-md font-small ">
                Hansraj Industries has served India’s core industries with unmatched dedication to quality, innovation, and engineering precision since 1968. From carbon brushes to copper connectors, and from custom parts to large-scale assemblies, we continue to empower India’s industrial backbone with excellence.
              </p>
            </div>
          </div>




          {/* Box 3: Additional Paragraph (with padding + border) */}
          <div className="md:col-span-1 bg-sky-900 p-6 border-2 border-sky-950 min-h-[235px] rounded-lg shadow">
            <p className="text-white font-head text-xl leading-relaxed">
              Hansraj Industries has been a cornerstone of Indian industry since 1968,
              delivering engineering excellence in every product—from carbon brushes to copper connectors.
            </p>
          </div>

          {/* Box 4: Button (larger, animated, styled) */}
          <div className="md:col-span-1">
            <a
              href="/brochure.pdf"
              download
              className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-head text-3xl py-26 px-6 rounded-lg text-center transition animate-pulse"
            >
              📎 Download Brochure
            </a>
          </div>
        </div>
      </section>




      {/* Categories Section */}
      <section className="py-12 px-6 sm:px-10 lg:px-24 relative">
        <h2 className="text-4xl font-bold font-head text-slate-800 mb-3 text-left border-b-[4px] border-amber-600 w-fit pb-1">
          Explore Our Categories
        </h2>

        {/* Arrows */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-[50%] transform -translate-y-1/2 z-10 bg-white p-2 shadow-md hover:scale-110 transition hidden md:block"
        >
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-[50%] transform -translate-y-1/2 z-10 bg-white p-2 shadow-md hover:scale-110 transition hidden md:block"
        >
          <ChevronRight className="w-6 h-6 text-slate-600" />
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar snap-x snap-mandatory"
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="min-w-[360px] max-w-sm bg-white border-2 border-sky-900 shadow-lg hover:shadow-xl transition duration-300 rounded-2xl flex-shrink-0 snap-start"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-[240px] object-cover rounded-t-2xl"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold font-head  text-sky-900 mb-2">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{cat.count}</p>
                <Link
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="text-sm text-emerald-700 font-small font-semibold hover:underline"
                >
                  Browse products →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block px-8 py-3 text-base font-small text-white bg-emerald-600 hover:bg-emerald-700 transition rounded-md"
          >
            View Complete Range
          </Link>
        </div>
      </section>

      {/* Clients Banner */}
      <div className="bg-white py-10 px-6 sm:px-10 lg:px-24 border-t border-amber-100">
        <h3 className="text-center text-xl font-semibold text-gray-800 mb-6">
          Our Clients
        </h3>
        <div className="overflow-hidden relative">
          <div className="flex animate-marquee whitespace-nowrap gap-16">
            {[...clients, ...clients].map((client, i) => (
              <div key={i} className="flex flex-col items-center min-w-[120px] text-center">
                <img
                  src={`/clients/${client.toLowerCase().replace(/ /g, "-")}.png`}
                  alt={client}
                  className="h-12 object-contain mb-2"
                />
                <p className="text-sm text-gray-600">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
