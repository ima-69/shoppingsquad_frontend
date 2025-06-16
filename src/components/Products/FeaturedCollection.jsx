import React from 'react';
import { Link } from 'react-router-dom';
import featured from '../../assets/featured.webp';

const FeaturedCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center rounded-3xl shadow-lg overflow-hidden">
        {/* Left Content */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left space-y-4">
          <h3 className="text-lg font-semibold text-indigo-700 tracking-wide">
            Comfort and Style
          </h3>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Apparel made for your everyday life
          </h2>
          <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
            Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great every day.
          </p>
          <Link
            to="/collections/all"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md
                       hover:bg-indigo-700 hover:shadow-lg active:scale-95 transform transition duration-300 ease-in-out
                       focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2">
          <img
            src={featured}
            alt="Featured Collection"
            className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
