import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";

import { HiPlus, HiMinus, HiShoppingCart } from "react-icons/hi";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") setQuantity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color.", { duration: 1500 });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => toast.success("Added to cart!", { duration: 1500 }))
      .finally(() => setIsButtonDisabled(false));
  };

  if (loading) {
    return (
      <p className="text-center text-gray-600 py-16 text-lg font-medium">Loading...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 py-16 text-lg font-semibold">
        Error: {error}
      </p>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4">
      {selectedProduct && (
        <div className="max-w-7xl mx-auto bg-white p-5 md:p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col space-y-3 shrink-0">
              {selectedProduct.images.map((image, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(image.url)}
                  className={`w-20 h-20 rounded-lg border-2 focus:outline-none focus:ring-2 transition ${
                    mainImage === image.url
                      ? "border-indigo-600 ring-indigo-400"
                      : "border-gray-300 hover:border-indigo-400"
                  }`}
                  aria-label={`Thumbnail ${i + 1}`}
                  type="button"
                >
                  <img
                    src={image.url}
                    alt={image.altText || `Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="md:flex-1">
              <img
                src={mainImage}
                alt={selectedProduct.name}
                className="w-full max-h-[480px] rounded-xl object-cover shadow-md"
                draggable={false}
              />
            </div>

            {/* Mobile Thumbnails */}
            <div className="flex md:hidden overflow-x-auto space-x-3 mb-4">
              {selectedProduct.images.map((image, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(image.url)}
                  className={`w-20 h-20 rounded-lg border-2 focus:outline-none focus:ring-2 transition shrink-0 ${
                    mainImage === image.url
                      ? "border-indigo-600 ring-indigo-400"
                      : "border-gray-300 hover:border-indigo-400"
                  }`}
                  aria-label={`Thumbnail ${i + 1}`}
                  type="button"
                >
                  <img
                    src={image.url}
                    alt={image.altText || `Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </button>
              ))}
            </div>

            {/* Details */}
            <div className="md:flex-1 flex flex-col">
              <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900">
                {selectedProduct.name}
              </h1>

              <div className="flex items-center gap-3 mb-3">
                {selectedProduct.originalPrice && (
                  <span className="text-base md:text-lg line-through text-gray-400">
                    ${selectedProduct.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xl md:text-2xl font-semibold text-indigo-700">
                  ${selectedProduct.price.toFixed(2)}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{selectedProduct.description}</p>

              {/* Colors */}
              <div className="mb-4">
                <p className="text-gray-800 font-semibold mb-1 md:mb-2">Color</p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color.toLowerCase() }}
                      className={`w-6 h-6 rounded-full border-2 cursor-pointer focus:outline-none focus:ring-2 transition ${
                        selectedColor === color
                          ? "border-indigo-600 ring-indigo-400"
                          : "border-gray-300"
                      }`}
                      aria-label={`Select color ${color}`}
                      title={color}
                      type="button"
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-4">
                <p className="text-gray-800 font-semibold mb-1 md:mb-2">Size</p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 md:px-5 py-1 md:py-2 rounded-lg border-2 font-medium cursor-pointer transition focus:outline-none focus:ring-2 ${
                        selectedSize === size
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "border-gray-300 text-gray-700 hover:bg-indigo-100"
                      }`}
                      aria-label={`Select size ${size}`}
                      type="button"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <p className="text-gray-800 font-semibold mb-1 md:mb-2">Quantity</p>
                <div className="flex items-center gap-3 max-w-[140px]">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    disabled={quantity === 1}
                    className={`flex items-center justify-center w-8 h-8 rounded-lg border-2 transition focus:outline-none focus:ring-2 ${
                      quantity === 1
                        ? "border-gray-300 text-gray-300 cursor-not-allowed"
                        : "border-indigo-600 text-indigo-600 hover:bg-indigo-100"
                    }`}
                    aria-label="Decrease quantity"
                    type="button"
                  >
                    <HiMinus className="w-5 h-5" />
                  </button>
                  <span className="text-lg font-semibold select-none">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="flex items-center justify-center w-8 h-8 rounded-lg border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-100 transition focus:outline-none focus:ring-2"
                    aria-label="Increase quantity"
                    type="button"
                  >
                    <HiPlus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`mt-auto w-full py-3 rounded-lg font-semibold text-white transition focus:outline-none focus:ring-4 flex items-center justify-center gap-2 ${
                  isButtonDisabled
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
                aria-disabled={isButtonDisabled}
                type="button"
              >
                <HiShoppingCart className="w-6 h-6" />
                {isButtonDisabled ? "Adding..." : "Add to Cart"}
              </button>

              {/* Characteristics */}
              <div className="mt-8 text-gray-700">
                <h3 className="text-xl font-bold mb-3">Characteristics</h3>
                <table className="w-full text-left text-sm border border-gray-200 rounded-md">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-4 font-medium">Brand</td>
                      <td className="py-2 px-4">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-medium">Material</td>
                      <td className="py-2 px-4">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Similar products */}
          <div className="mt-15">
            <h2 className="text-3xl font-semibold text-center mb-6">You May Also Like</h2>
            <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
