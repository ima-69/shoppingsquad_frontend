import React from 'react';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';

const Topbar = () => {
  return (
    <div className="bg-squad-blue text-white top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-2.5 px-4">
        <div className='hidden md:flex items-center space-x-5'>
          <a href="#" className="hover:text-white hover:bg-white/20 p-1.5 rounded-full transition-all duration-300 flex items-center justify-center">
            <TbBrandMeta className="h-4.5 w-4.5" />
          </a>
          <a href="#" className="hover:text-white hover:bg-white/20 p-1.5 rounded-full transition-all duration-300 flex items-center justify-center">
            <IoLogoInstagram className="h-4.5 w-4.5" />
          </a>
          <a href="#" className="hover:text-white hover:bg-white/20 p-1.5 rounded-full transition-all duration-300 flex items-center justify-center">
            <RiTwitterXLine className="h-4.5 w-4.5" />
          </a>
        </div>
        <div className='text-sm font-medium text-center flex-grow tracking-wide'>
          <span>We ship worldwide - Fast and reliable shipping!</span>
        </div>
        <div className='text-sm hidden md:block'>
          <a href='tel:+1234567890' className='hover:text-white hover:underline transition-all duration-200 font-medium'>
            +1 (234) 567-890
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
