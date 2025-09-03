"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Profile from './Profile';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand - could be added here if needed */}
          <div className="flex-shrink-0">
            {/* Add your logo here if needed */}
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <Link 
              href="/upload"
              target='/upload'
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === '/' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Upload
            </Link>
            <Link 
              href="/videos"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === '/videos' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Videos
            </Link>
          </div>

          {/* User Profile Section - matching your screenshot */}
          <div className="flex items-center space-x-4">
            <Profile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;