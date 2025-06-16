import React from 'react';
import Topbar from '../Layout/Topbar';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className=" relative z-50 ">
      {/* Topbar fixed at top */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Topbar />
      </div>

      {/* Navbar fixed below Topbar */}
      <div className="fixed top-[40px] left-0 w-full z-60">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
