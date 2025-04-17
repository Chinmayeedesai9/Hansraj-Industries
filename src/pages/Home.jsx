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
    <div className="w-full bg-zinc-400">
      {/* Banner */}
      <div
        className="w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Hansind4.png')" }}
      />

      {/* Categories Section */}
      <section className="py-12 px-6 relative">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
          Explore our Categories
        </h2>

        {/* Arrow Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-[50%] transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-[50%] transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          <ChevronRight className="w-6 h-6 text-slate-600" />
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex space-x-8 overflow-x-auto no-scrollbar px-4 scroll-smooth"
        >
          {categories.map((cat, index) => (
            <Link
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              key={index}
              className="min-w-[300px] h-[360px] bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex-shrink-0"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-[220px] object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-700">{cat.name}</h3>
                <p className="text-zinc-500 text-sm">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block px-8 py-3 text-base font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition"
          >
            View complete range
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
