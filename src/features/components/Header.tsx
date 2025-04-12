import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css';
import { RootState } from '../../app/store';
import Avatar from './Avatar';
import { logout } from '../../features/auth/authSlice';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Check if current route is login or register page
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo-section">
            <Link to="/" className="logo-link">
              <span className="logo-text">Forum</span>
            </Link>
          </div>

          {/* Search Bar - Only show on non-auth pages */}
          {!isAuthPage && (
            <div className="search-section">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                />
                <button className="search-button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className={`nav-section ${isAuthPage ? 'nav-section-auth' : ''}`}>
            <nav className="nav-buttons">
              {isAuthenticated ? (
                <>
                  <Avatar color="#3b82f6" className="avatar" />
                  <button
                    onClick={handleLogout}
                    className="btn btn-logout"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="btn btn-login"
                  >
                    Đăng nhập
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn btn-register"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}; 