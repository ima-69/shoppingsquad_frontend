import React, { useEffect, useState, useRef } from 'react'
import { FaFilter } from "react-icons/fa"
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const HEADER_HEIGHT = 108; // Adjust for your header height
const SIDEBAR_WIDTH = 256; // 64 * 4 (w-64)

const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParams]);

    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    }, [dispatch, collection, searchParams]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='flex flex-col lg:flex-row'>
            {/* Mobile Filter button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden border p-2 flex justify-center items-center"
            >
                <FaFilter className='mr-2' />
                Filter
            </button>

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`
                    fixed top-[${HEADER_HEIGHT}px] left-0 z-50 bg-white overflow-y-auto transition-transform duration-300
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
                style={{
                    top: HEADER_HEIGHT,
                    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
                    width: SIDEBAR_WIDTH,
                }}
            >
                <FilterSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-grow p-4 lg:ml-64">
                <SortOptions />
                <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default CollectionPage;
