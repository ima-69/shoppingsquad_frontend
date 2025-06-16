import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturedSection from "../components/Products/FeaturedSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  const [bestSellerState, setBestSellerState] = useState({
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Fetch products for specific collection (Women, Top Wear)
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Top Wear",
        Limit: 8,
      })
    );

    // Fetch best seller product
    const fetchBestSeller = async () => {
      setBestSellerState({ loading: true, error: null });
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
        setBestSellerState({ loading: false, error: null });
      } catch (error) {
        setBestSellerState({
          loading: false,
          error: "Failed to load best seller product. Please try again later.",
        });
        console.error("Best Seller Fetch Error:", error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <main>
      <Hero />

      <div className="my-0">
        <GenderCollectionSection />
      </div>

      <div className="my-0">
        <NewArrivals />
      </div>

      {/* Best Seller Section */}
      <section className="my-0 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-8 tracking-tight">
          Best Seller
        </h2>

        {bestSellerState.loading && (
          <p className="text-center text-gray-500 text-lg">
            Loading best seller product...
          </p>
        )}

        {bestSellerState.error && (
          <p className="text-center text-red-600 font-semibold mb-6">
            {bestSellerState.error}
          </p>
        )}

        {bestSellerProduct && !bestSellerState.loading && !bestSellerState.error && (
          <ProductDetails productId={bestSellerProduct._id} />
        )}
      </section>

      {/* Women’s Top Wear */}
      <section className="my-0 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-6 tracking-tight">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </section>

      {/* Featured Sections */}
      <div className="my-0">
        <FeaturedCollection />
      </div>
      <div className="my-0">
        <FeaturedSection />
      </div>
    </main>
  );
};

export default Home;
