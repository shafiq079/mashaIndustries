import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center p-4">
      <h1 className="text-9xl font-bold text-red-600">404</h1>
      <h2 className="text-4xl font-semibold text-gray-800 mt-4">Oops! Page Not Found.</h2>
      <p className="text-lg text-gray-600 mt-2">The page you are looking for does not exist or has been moved.</p>
      <Link 
        to="/"
        className='bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full hover:scale-110 transition-all mx-auto block mt-8'
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
