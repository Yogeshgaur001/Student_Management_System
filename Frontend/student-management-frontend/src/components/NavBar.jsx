// Create a new file src/components/Navbar.jsx
/*import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={{
      backgroundColor: '#fff',
      padding: '1rem 2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '2rem', 
        alignItems: 'center' 
      }}>
        <Link to="/dashboard" style={{
          color: '#2196F3',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          🎓 Student Manager
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/dashboard" style={{
            color: '#666',
            textDecoration: 'none',
            fontWeight: '500'
          }}>Dashboard</Link>
          <Link to="/students" style={{
            color: '#666',
            textDecoration: 'none',
            fontWeight: '500'
          }}>Students</Link>
        </div>
      </div>
      <button 
        onClick={handleLogout}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#ff4757',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500',
          transition: 'background 0.2s'
        }}
        onMouseOver={e => e.target.style.backgroundColor = '#ff6b81'}
        onMouseOut={e => e.target.style.backgroundColor = '#ff4757'}
      >
        Logout
      </button>
    </nav>
  );
}*/


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const handleNavClick = (item) => {
    setActiveItem(item);
    setIsMobileMenuOpen(false);

    if (item === 'home' || item === 'dashboard') {
      navigate('/dashboard');
    } else {
      navigate(`/${item}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setActiveItem('dashboard');
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ease-in-out ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <button onClick={() => handleNavClick('home')} className="text-xl font-bold text-gray-800">
              Student Management
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {['home', 'students', 'courses', 'reports'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeItem === item
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative ml-3">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User profile"
                />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={() => handleNavClick('settings')}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center -mr-2 sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {['home', 'students', 'courses', 'reports', 'settings'].map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`block w-full px-3 py-2 text-base font-medium text-left ${
                  activeItem === item
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="block w-full px-3 py-2 text-base font-medium text-left text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
