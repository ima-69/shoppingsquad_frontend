import React from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header (fixed) */}
      <Header />

      {/* Main content with top padding to offset fixed header */}
      <main className="pt-[108px] flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
