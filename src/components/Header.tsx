import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center ">
            <span className="text-2xl font-bold text-blue-600">Forum</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-blue-600">Đăng nhập</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-600">Đăng ký</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 