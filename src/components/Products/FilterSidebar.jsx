import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "Navy",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });
    setPriceRange([0, Number(params.maxPrice) || 100]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key] !== "" && newFilters[key] !== null && newFilters[key] !== undefined) {
        params.append(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-md w-full max-w-xs">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">Filter</h3>

      {/* Category Filter */}
      <section className="mb-6">
        <label className="block text-gray-700 font-semibold mb-3">Category</label>
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center space-x-3 mb-2 cursor-pointer"
          >
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-gray-800 select-none">{category}</span>
          </label>
        ))}
      </section>

      {/* Gender Filter */}
      <section className="mb-6">
        <label className="block text-gray-700 font-semibold mb-3">Gender</label>
        {genders.map((gender) => (
          <label
            key={gender}
            className="flex items-center space-x-3 mb-2 cursor-pointer"
          >
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-gray-800 select-none">{gender}</span>
          </label>
        ))}
      </section>

      {/* Color Filter */}
      <section className="mb-6">
        <label className="block text-gray-700 font-semibold mb-3">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={() =>
                handleFilterChange({
                  target: { name: "color", value: color, type: "button" },
                })
              }
              type="button"
              aria-label={`Filter by color ${color}`}
              className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-2 ${
                filters.color === color
                  ? "ring-4 ring-indigo-600 border-indigo-600"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            />
          ))}
        </div>
      </section>

      {/* Size Filter */}
      <section className="mb-6">
        <label className="block text-gray-700 font-semibold mb-3">Size</label>
        {sizes.map((size) => (
          <label
            key={size}
            className="flex items-center space-x-3 mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
              className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-gray-800 select-none">{size}</span>
          </label>
        ))}
      </section>

      {/* Material Filter */}
      <section className="mb-6">
        <label className="block text-gray-700 font-semibold mb-3">Material</label>
        {materials.map((material) => (
          <label
            key={material}
            className="flex items-center space-x-3 mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
              className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-gray-800 select-none">{material}</span>
          </label>
        ))}
      </section>

      {/* Brand Filter */}
      <section className="mb-6">
        <label className="block text-gray-700 font-semibold mb-3">Brand</label>
        {brands.map((brand) => (
          <label
            key={brand}
            className="flex items-center space-x-3 mb-2 cursor-pointer"
          >
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
            />
            <span className="text-gray-800 select-none">{brand}</span>
          </label>
        ))}
      </section>

      {/* Price Range Filter */}
      <section className="mb-8">
        <label className="block text-gray-700 font-semibold mb-3">Price Range</label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer transition-colors hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={priceRange[1]}
        />
        <div className="flex justify-between text-gray-700 mt-2 text-sm font-semibold">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </section>
    </div>
  );
};

export default FilterSidebar;
