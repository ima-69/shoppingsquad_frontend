import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductGrid = ({ products = [], loading, error }) => {
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-500 text-lg font-medium">
        Loading products...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-600 text-lg font-semibold">
        Error: {error}
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center py-10 text-gray-400 text-lg font-medium">
        No products available.
      </p>
    );
  }

  const handleQuickAdd = (product) => {
    const size = product.sizes?.[0] || "";
    const color = product.colors?.[0] || "";

    dispatch(
      addToCart({
        productId: product._id,
        quantity: 1,
        size,
        color,
        guestId,
        userId: user?._id,
      })
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
      {products.map((product, index) => (
        <Link
          key={index}
          to={`/product/${product._id}`}
          className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          aria-label={`View details for ${product.name}`}
        >
          <div className="relative w-full h-72 overflow-hidden rounded-t-lg">
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-full object-cover rounded-t-lg transform transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />
          </div>

          <div className="p-4 flex flex-col justify-between h-40">
            <h3 className="text-base font-semibold text-gray-900 truncate mb-2">
              {product.name}
            </h3>
            <p className="text-indigo-700 font-bold text-lg mb-4">
              ${product.price.toFixed(2)}
            </p>

            {/* Quick Add to Cart */}
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              onClick={(e) => {
                e.preventDefault();
                handleQuickAdd(product);
              }}
              aria-label={`Add ${product.name} to cart`}
            >
              <HiShoppingCart className="w-5 h-5" />
              Quick Add
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
