import { useRef } from "react";
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

const Home = () => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div
        className="relative w-full h-[90vh] bg-center bg-cover"
        style={{ backgroundImage: "url('/Hansind6.png')" }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">Hansraj Industries</h1>
            <p className="mt-4 text-lg md:text-xl text-zinc-200 max-w-xl mx-auto">
              Established in the year 1968 at Pune, Maharashtra.
            </p>
            <Link
              to="/products"
              className="inline-block mt-6 px-8 py-3 text-lg font-semibold text-white bg-yellow-600 hover:bg-yellow-700 transition"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-16 px-4 md:px-10 bg-zinc-50 relative">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">
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

        {/* Category Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-2 scroll-smooth pb-4 hide-scrollbar"
        >
          {categories.map((cat, index) => (
            <Link
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              key={index}
              className="min-w-[300px] sm:min-w-[320px] md:min-w-[30%] max-w-[30%] bg-white border-[2px] border-zinc-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex-shrink-0"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-[220px] object-cover rounded-t-md"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-800">{cat.name}</h3>
                <p className="text-sm text-zinc-500">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>


        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block px-8 py-3 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition"
          >
            View Complete Range
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
