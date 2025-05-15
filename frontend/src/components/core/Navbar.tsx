import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-sm bg-opacity-80"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-serif font-bold text-primary-dark"
            >
              Urban<span className="text-accent-default">Lease</span>
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Contact'].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase()}`}
                className="relative text-secondary-800 font-medium hover:text-accent-default transition-colors"
              >
                <motion.span whileHover={{ scale: 1.05 }}>
                  {item}
                </motion.span>
                {location.pathname.includes(item.toLowerCase()) && (
                  <motion.div 
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-default"
                    transition={{ type: 'spring', bounce: 0.25 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <motion.div 
            className={`hidden md:flex items-center px-3 rounded-full transition-all duration-300 ${
              isSearchFocused ? 'bg-white shadow-md ring-2 ring-accent-default' : 'bg-neutral-100'
            }`}
            animate={{ width: isSearchFocused ? 250 : 200 }}
          >
            <FontAwesomeIcon icon={faSearch} className="text-secondary-500 mr-2" />
            <input
              type="text"
              placeholder="Search properties..."
              className="py-2 bg-transparent outline-none w-full text-secondary-800 placeholder-secondary-400"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </motion.div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-neutral-100 relative"
              onClick={() => console.log('Notifications clicked')} // Will be replaced with notification component
            >
              <FontAwesomeIcon icon={faBell} className="text-secondary-600" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent-default"></span>
            </motion.button>

            <div className="relative" ref={profileRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-light to-accent-default flex items-center justify-center text-white">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <div className="px-4 py-2 border-b border-neutral-100">
                      <p className="text-sm font-medium text-secondary-800">John Doe</p>
                      <p className="text-xs text-secondary-500">Agent</p>
                    </div>
                    <button
                      className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-neutral-100"
                      onClick={() => console.log('Logout')}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-accent-default" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;