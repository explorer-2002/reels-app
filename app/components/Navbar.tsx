

"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Profile from './Profile';
import { ThemeSwitcher } from './ThemeSwitcher';

const Navbar = () => {
  const pathname = usePathname();

  if(pathname === '/login' || pathname === '/register')
    return <></>
    
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand Section */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              {/* You can replace this with your actual logo */}
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 000 2h8a1 1 0 100-2H5z"/>
                </svg>
              </div>
              <span className="text-xl font-semibold hidden sm:block">ReelHub</span>
              <ThemeSwitcher />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-1">
            <Link 
              href="/"
              className={`relative px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                pathname === '/' 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Upload
              {pathname === '/' && (
                <div className="absolute -bottom-px left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </Link>
            <Link 
              href="/videos"
              className={`relative px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                pathname === '/videos' 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Videos
              {pathname === '/videos' && (
                <div className="absolute -bottom-px left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </Link>
             <Link 
              href="/images"
              className={`relative px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                pathname === '/images' 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Images
              {pathname === '/images' && (
                <div className="absolute -bottom-px left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </Link>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center space-x-3">
            {/* Optional: Add notification or settings icons here */}
            {/* <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM3 12h12M3 6h12M3 18h12" />
              </svg>
            </button> */}
            
            <div className="h-6 w-px bg-gray-200"></div>
            
            <Profile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;