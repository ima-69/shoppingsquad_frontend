import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    if (sortBy) {
      searchParams.set("sortBy", sortBy);
    } else {
      searchParams.delete("sortBy");
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="flex justify-end mb-6">
      <div className="relative w-48">
        <label htmlFor="sort" className="sr-only">
          Sort Products
        </label>
        <select
          id="sort"
          onChange={handleSortChange}
          value={searchParams.get("sortBy") || ""}
          className="appearance-none w-full border border-gray-300 rounded-lg
                     px-4 py-2 text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     transition-shadow shadow-sm hover:shadow-md"
        >
          <option value="">Default</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>

        {/* Custom arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SortOptions;
