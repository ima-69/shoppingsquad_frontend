import { Link } from "react-router-dom";
import mensCollectionImage from "../../assets/mens-collection.webp";
import womensCollectionImage from "../../assets/womens-collection.webp";

const GenderCollectionSection = () => {
  return (
    <section className="py-20 px-4 lg:px-0">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Women's Collection */}
        <div className="relative group rounded-xl overflow-hidden shadow-md">
          <img
            src={womensCollectionImage}
            alt="Women's Collection"
            className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-6 backdrop-blur bg-white/80 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="inline-block bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-semibold transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Shop Now →
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative group rounded-xl overflow-hidden shadow-md">
          <img
            src={mensCollectionImage}
            alt="Men's Collection"
            className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-6 backdrop-blur bg-white/80 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="inline-block bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-semibold transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Shop Now →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
