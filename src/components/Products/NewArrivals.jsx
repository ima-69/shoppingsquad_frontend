import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  // Drag handlers (mouse + touch)
  const onDragStart = (pageX) => {
    isDraggingRef.current = true;
    startXRef.current = pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const onDragMove = (pageX) => {
    if (!isDraggingRef.current) return;
    const x = pageX - scrollRef.current.offsetLeft;
    const walk = x - startXRef.current;
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const onDragEnd = () => {
    isDraggingRef.current = false;
  };

  // Scroll buttons scroll by card width
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.children[0];
    if (!card) return;

    const cardWidth = card.offsetWidth + 32; // margin between cards
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Update scroll buttons and active index for zoom effect
  const updateScrollButtonsAndActive = () => {
    const container = scrollRef.current;
    if (!container) return;

    const leftScroll = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    setCanScrollLeft(leftScroll > 0);
    setCanScrollRight(leftScroll < maxScrollLeft - 1);

    const centerX = leftScroll + container.clientWidth / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const dist = Math.abs(centerX - childCenter);
      if (dist < closestDistance) {
        closestDistance = dist;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtonsAndActive);
      updateScrollButtonsAndActive();
      return () =>
        container.removeEventListener("scroll", updateScrollButtonsAndActive);
    }
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-0 relative">
      <div className="container mx-auto text-center mb-12 relative z-10">
        <h2 className="text-3xl font-extrabold mb-4 text-gray-900">
          Explore New Arrivals
        </h2>
        <p className="text-lg max-w-xl mx-auto text-gray-600 leading-relaxed">
          Discover the latest styles straight off the runway, freshly added to keep your wardrobe on
          the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-0 top-full mt-6 flex space-x-4 z-20">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg border border-gray-300 bg-white text-gray-900 transition 
              ${canScrollLeft ? "hover:bg-gray-100 focus:ring-4 focus:ring-indigo-300" : "opacity-40 cursor-not-allowed"}`}
            aria-label="Scroll Left"
          >
            <FiChevronLeft className="text-3xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg border border-gray-300 bg-white text-gray-900 transition 
              ${canScrollRight ? "hover:bg-gray-100 focus:ring-4 focus:ring-indigo-300" : "opacity-40 cursor-not-allowed"}`}
            aria-label="Scroll Right"
          >
            <FiChevronRight className="text-3xl" />
          </button>
        </div>
      </div>

      {/* Scrollable Container with scrollbar visible */}
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-white pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-white pointer-events-none z-10" />

        <div
          ref={scrollRef}
          className="container mx-auto overflow-x-scroll flex space-x-8 px-4 sm:px-6 snap-x snap-mandatory scroll-smooth cursor-grab"
          onMouseDown={(e) => onDragStart(e.pageX)}
          onMouseMove={(e) => onDragMove(e.pageX)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={(e) => onDragStart(e.touches[0].pageX)}
          onTouchMove={(e) => onDragMove(e.touches[0].pageX)}
          onTouchEnd={onDragEnd}
          style={{ scrollPaddingInline: "50%" }}
        >
          {newArrivals.map((product, index) => {
            const isActive = index === activeIndex;
            const scale = isActive ? 1 : 0.85;
            const translateY = isActive ? "-10px" : "0";

            return (
              <div
                key={product._id}
                className="snap-center min-w-[90%] sm:min-w-[60%] lg:min-w-[40%] xl:min-w-[30%] relative rounded-2xl shadow-lg overflow-hidden transition-transform duration-500 ease-out"
                style={{
                  transform: `scale(${scale}) translateY(${translateY})`,
                  boxShadow: isActive
                    ? "0 15px 30px rgba(0, 0, 0, 0.2)"
                    : "0 8px 15px rgba(0, 0, 0, 0.1)",
                  zIndex: isActive ? 20 : 10,
                }}
              >
                <img
                  src={product.images[0]?.url}
                  alt={product.images[0]?.altText || product.name}
                  className="w-full h-[350px] sm:h-[400px] lg:h-[420px] object-cover rounded-2xl select-none pointer-events-none"
                  draggable="false"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white rounded-b-2xl">
                  <Link to={`/product/${product._id}`} className="block">
                    <h4 className="font-semibold text-2xl leading-tight">{product.name}</h4>
                    <p className="mt-2 text-lg font-semibold">${product.price}</p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
