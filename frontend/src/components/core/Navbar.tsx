import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faUser,
  faSignOutAlt,
  faHome,
  faInfoCircle,
  faEnvelope,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { logout } from '../../redux/slice/authSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSidebarCollapsed } = useAppSelector((state) => state.ui);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleCliqueOutside = (event: any) => {
      if (profileRef.current && !profileRef?.current?.contains(event?.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleCliqueOutside);
    return () => document.removeEventListener('mousedown', handleCliqueOutside);
  }, []);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items with icons
  const navItems = [
    { name: 'Home', path: '/', icon: faHome },
    { name: 'Properties', path: '/properties', icon: faMapMarkerAlt },
    { name: 'About', path: '/about', icon: faInfoCircle },
    { name: 'Contact', path: '/contact', icon: faEnvelope },
  ];

  function handleLogout(): void {
    dispatch(logout());
    console.log('Logout');
    navigate('/');
  }

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md backdrop-blur-sm bg-opacity-90 py-2'
          : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center ${
          isAuthenticated
            ? isSidebarCollapsed
              ? 'lg:pl-[88px]' // w-20 + 8px
              : 'lg:pl-[272px]' // w-64 + 8px
            : ''
        }`}
      >
        <div className="flex justify-between items-center w-full">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-serif font-bold text-primary-dark"
            >
              Urban<span className="text-accent-default">Lease</span>
            </motion.div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="relative text-secondary-800 font-medium hover:text-accent-default transition-colors flex items-center group"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center"
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="mr-2 text-accent-default group-hover:text-accent-dark transition-colors"
                    size="sm"
                  />
                  {item.name}
                </motion.span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-default"
                    transition={{ type: 'spring', bounce: 0.25 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Only show on desktop */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-neutral-100 relative hidden md:block"
              onClick={() => console.log('Notifications clicked')}
            >
              <FontAwesomeIcon icon={faBell} className="text-secondary-600" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent-default"></span>
            </motion.button>

            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-light to-accent-default flex items-center justify-center text-white shadow-md">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <span className="hidden md:block text-secondary-800 font-medium">
                  {user?.username || 'Anonymous'}
                </span>
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-1 z-50 border border-neutral-100"
                  >
                    <div className="px-4 py-3 border-b border-neutral-100">
                      <p className="text-sm font-medium text-secondary-800">
                        {user?.username || 'Anonymous'}
                      </p>
                      <p className="text-xs text-secondary-500">
                        {user?.role || 'Role'}
                      </p>
                      <p className="text-xs text-accent-default mt-1">
                        {user?.email || 'Email Id'}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-neutral-50"
                      >
                        <FontAwesomeIcon
                          icon={faUser}
                          className="mr-3 text-secondary-400"
                        />
                        My Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-neutral-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-3 text-secondary-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Settings
                      </Link>
                    </div>

                    <div className="border-t border-neutral-100 py-1">
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-neutral-50"
                        onClick={() => handleLogout()}
                      >
                        <FontAwesomeIcon
                          icon={faSignOutAlt}
                          className="mr-3 text-accent-default"
                        />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-secondary-600 hover:text-secondary-900 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1 bg-white border-t border-neutral-100">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-secondary-800 hover:bg-neutral-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="mr-3 text-accent-default"
                  />
                  {item.name}
                </Link>
              ))}

              {/* Search bar in mobile menu
              <div className="relative mt-3 px-3">
                <div className="flex items-center bg-neutral-100 px-3 rounded-full">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="text-secondary-500"
                  />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="w-full p-2 bg-transparent text-secondary-800 placeholder-secondary-400"
                  />
                </div>
              </div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;