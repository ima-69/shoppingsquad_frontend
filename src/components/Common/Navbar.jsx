import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineShoppingBag,
  HiMenuAlt3,
  HiX
} from 'react-icons/hi';
import { IoShirtOutline } from 'react-icons/io5';
import { GiTrousers } from 'react-icons/gi';
import { BsGenderMale, BsGenderFemale } from 'react-icons/bs';
import { FiShoppingBag, FiUser } from 'react-icons/fi';
import { AiOutlineShop } from 'react-icons/ai';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`top-10 left-0 w-full z-40 backdrop-blur-md transition-all duration-300  ${
        scrolled ? 'bg-white/60 shadow-md' : 'bg-white/90'
      }`}>
        <div className='container mx-auto flex items-center justify-between py-4 px-6'>
          <Link to='/' className='text-2xl font-bold tracking-tight hover:text-indigo-600'>
            FASHION SQUAD
          </Link>

          <div className='hidden md:flex space-x-8'>
            <NavLink to='/collections/all?gender=Men'  label='Men' />
            <NavLink to='/collections/all?gender=Women' label='Women' />
            <NavLink to='/collections/all?category=Top Wear' icon={<IoShirtOutline />} label='Top Wear' />
            <NavLink to='/collections/all?category=Bottom Wear' icon={<GiTrousers />} label='Bottom Wear' />
          </div>

          <div className='flex items-center space-x-6'>
            {user?.role === 'admin' && (
              <Link
                to='/admin'
                className='flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-full text-sm text-white font-medium'
              >
                <AiOutlineShop className='h-4 w-4' />
                <span>Admin</span>
              </Link>
            )}
            <Link to='/profile'>
              <FiUser className='h-6 w-6 text-gray-700 hover:text-indigo-600' />
            </Link>
            <button onClick={toggleCartDrawer} className='relative'>
              <FiShoppingBag className='h-6 w-6 text-gray-700 hover:text-indigo-600' />
              {cartItemCount > 0 && (
                <span className='absolute -top-1 -right-2 bg-indigo-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium'>
                  {cartItemCount}
                </span>
              )}
            </button>
            <div className='hidden md:block'>
              <SearchBar />
            </div>
            <button onClick={toggleNavDrawer} className='md:hidden'>
              <HiMenuAlt3 className='h-6 w-6 text-gray-700 hover:text-indigo-600' />
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {navDrawerOpen && (
        <div
          className='fixed inset-0 bg-black/30 z-40'
          onClick={toggleNavDrawer}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex justify-between items-center p-6 border-b'>
          <Link to='/' onClick={toggleNavDrawer} className='text-xl font-bold'>
            FASHION SQUAD
          </Link>
          <button onClick={toggleNavDrawer}>
            <HiX className='h-6 w-6 text-gray-600' />
          </button>
        </div>

        <div className='p-6 z-700'>
          <nav className='space-y-6'>
            <MobileLink to='/collections/all?gender=Men' label='Men' icon={<BsGenderMale />} toggle={toggleNavDrawer} />
            <MobileLink to='/collections/all?gender=Women' label='Women' icon={<BsGenderFemale />} toggle={toggleNavDrawer} />
            <MobileLink to='/collections/all?category=Top Wear' label='Top Wear' icon={<IoShirtOutline />} toggle={toggleNavDrawer} />
            <MobileLink to='/collections/all?category=Bottom Wear' label='Bottom Wear' icon={<GiTrousers />} toggle={toggleNavDrawer} />
          </nav>

          <div className='mt-8 pt-6 border-t space-y-4'>
            <MobileLink to='/profile' label='My Account' icon={<FiUser />} toggle={toggleNavDrawer} />
            {user?.role === 'admin' && (
              <MobileLink to='/admin' label='Admin Dashboard' icon={<AiOutlineShop />} toggle={toggleNavDrawer} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const NavLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className='text-gray-600 hover:text-indigo-600 text-sm font-medium uppercase tracking-wide transition-colors duration-200 relative group flex items-center'
  >
    {icon}
    <span className='ml-1'>{label}</span>
    <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full'></span>
  </Link>
);

const MobileLink = ({ to, label, icon, toggle }) => (
  <Link
    to={to}
    onClick={toggle}
    className='flex items-center space-x-3 text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200'
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
