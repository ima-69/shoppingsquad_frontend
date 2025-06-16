import React from 'react'
import heroImg from '../../assets/squad-hero.webp'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="relative">
      {/* Background Image */}
      <img
        src={heroImg}
        alt="squad"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="text-center text-white max-w-4xl">
          <h1 className="text-4xl md:text-8xl font-extrabold tracking-tight uppercase mb-6 leading-tight drop-shadow-lg">
            Vacation <br /> Ready
          </h1>
          <p className="text-sm md:text-lg tracking-wide mb-8 drop-shadow-md max-w-xl mx-auto">
            Explore our vacation-ready outfits with fast worldwide shipping.
          </p>
          <Link
            to="/collections/all"
            className="
              inline-block 
              bg-white 
              text-gray-900 
              px-8 py-4 
              rounded-lg 
              text-lg 
              font-semibold
              shadow-md
              transform
              transition
              duration-300
              ease-in-out
              hover:scale-105
              hover:shadow-xl
              focus:outline-none
              focus:ring-4
              focus:ring-indigo-400
              active:scale-95
            "
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
