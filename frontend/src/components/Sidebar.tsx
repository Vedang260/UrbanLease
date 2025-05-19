import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSearch,
  faFileAlt,
  faCreditCard,
  faUser,
  faChevronLeft,
  faChevronRight,
  faChartLine,
  faSignOutAlt,
  faBuilding,
  faUsers,
  faCog,
  faFileContract,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { toggleSidebar } from '../redux/slice/uiSlice';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const { isSidebarCollapsed } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  if (!user) return null;

  // Define menu items for each role
  const roleMenus = {
    tenant: [
      {
        name: 'Dashboard',
        icon: faHome,
        path: '/tenant/dashboard',
        submenu: null,
      },
      {
        name: 'Browse Properties',
        icon: faSearch,
        path: '/tenant/properties',
        submenu: null,
      },
      {
        name: 'My Requests',
        icon: faFileAlt,
        path: '/tenant/requests',
        submenu: [
          { name: 'Active Requests', path: '/tenant/requests/active' },
          { name: 'Request History', path: '/tenant/requests/history' },
        ],
      },
      {
        name: 'My Payments',
        icon: faCreditCard,
        path: '/tenant/payments',
        submenu: [
          { name: 'Payment History', path: '/tenants/payments/history' },
          { name: 'Upcoming Payments', path: '/tenants/payments/upcoming' },
        ],
      },
    ],
    owner: [
      {
        name: 'Dashboard',
        icon: faHome,
        path: '/owner/dashboard',
        submenu: null,
      },
      {
        name: 'My Properties',
        icon: faBuilding,
        path: '/owner/properties/',
        submenu: [
          { name: 'Active Listings', path: '/owner/properties/my-properties' },
          { name: 'Add New Property', path: '/owner/properties/new' },
        ],
      },
      {
        name: 'Leases',
        icon: faFileContract,
        path: '/owner/leases',
        submenu: [
          { name: 'Active Leases', path: '/owner/leases/active' },
          { name: 'Lease History', path: '/owner/leases/history' },
        ],
      },
      {
        name: 'Payments',
        icon: faCreditCard,
        path: '/owner/payments',
        submenu: null,
      },
    ],
    admin: [
      {
        name: 'Dashboard',
        icon: faChartLine,
        path: '/admin/dashboard',
        submenu: null,
      },
      {
        name: 'Users',
        icon: faUsers,
        path: '/admin/users',
        submenu: [
          { name: 'All Users', path: '/admin/users' },
          { name: 'Add New User', path: '/admin/users/new' },
        ],
      },
      {
        name: 'Properties',
        icon: faBuilding,
        path: '/properties',
        submenu: [
          { name: 'All Properties', path: 'admin/properties' },
          { name: 'Pending Approvals', path: '/admin/properties/pending' },
        ],
      },
      {
        name: 'System Settings',
        icon: faCog,
        path: '/admin/settings',
        submenu: null,
      },
    ],
  };

  // Common menu items for all roles
  const commonMenu = [
    {
      name: 'Profile',
      icon: faUser,
      path: '/profile',
      submenu: null,
    },
  ];

  // Get menu items based on user role
  const menuItems = [
    ...(roleMenus[(user.role).toLowerCase() as keyof typeof roleMenus] || []),
    ...commonMenu,
  ];

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  return (
    <>
        <button
    onClick={() => dispatch(toggleSidebar())}
    className="text-white hover:text-accent transition-colors"
  >
    <FontAwesomeIcon icon={isSidebarCollapsed ? faChevronRight : faChevronLeft} />
  </button>
    <motion.div
      className={`bg-white flex flex-col border-r border-neutral-200 transition-all duration-300 mt-0 ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {/* Sidebar Header */}
      <div
        className={`p-4 flex ${
          isCollapsed ? 'justify-center' : 'justify-between'
        } items-center bg-primary-dark`}
      >
        {!isCollapsed && (
          <Link to="/dashboard" className="flex items-center">
            <span className="text-white font-serif font-bold text-xl">
              Urban<span className="text-accent">Lease</span>
            </span>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:text-accent transition-colors"
        >
          <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
        </button>
      </div>

      {/* User Profile Summary */}
      {!isCollapsed && (
        <motion.div
          className="p-4 border-b border-neutral-200 flex items-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center text-white">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div>
            <p className="font-medium text-secondary-800">{user.username}</p>
            <p className="text-xs text-secondary-500 capitalize">
              {user.role} Account
            </p>
          </div>
        </motion.div>
      )}

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <div key={item.name} className="px-2">
            {item.submenu ? (
              <>
                <div
                  onClick={() => toggleSubmenu(item.name)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                    location.pathname.startsWith(item.path)
                      ? 'bg-accent/10 text-accent'
                      : 'hover:bg-neutral-100 text-secondary-700'
                  }`}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`mr-3 ${isCollapsed ? 'mx-auto' : ''}`}
                  />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      <FontAwesomeIcon
                        icon={
                          activeSubmenu === item.name
                            ? faChevronLeft
                            : faChevronRight
                        }
                        className="text-xs ml-2"
                      />
                    </>
                  )}
                </div>

                {activeSubmenu === item.name && !isCollapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="pl-11 space-y-1 mt-1"
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className={`block py-2 px-3 text-sm rounded transition-colors ${
                          location.pathname === subItem.path
                            ? 'bg-accent/20 text-accent'
                            : 'hover:bg-neutral-100 text-secondary-600'
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-accent/10 text-accent'
                    : 'hover:bg-neutral-100 text-secondary-700'
                }`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`${isCollapsed ? 'mx-auto' : 'mr-3'}`}
                />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Footer/Sign Out */}
      <div className="p-4 border-t border-neutral-200">
        <Link
          to="/logout"
          className={`flex items-center p-3 rounded-lg text-secondary-700 hover:bg-neutral-100 ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className={isCollapsed ? '' : 'mr-3'}
          />
          {!isCollapsed && <span>Sign Out</span>}
        </Link>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;