import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegCircleUser, FaBell } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import Search from './Search';
import UserMenu from './UserMenu';
import ThemeToggle from './ThemeToggle';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';
import useMobile from '../hooks/useMobile';

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector(state => state?.user);
  const cartItem = useSelector(state => state.cartItem.cart);
  const { totalPrice, totalQty } = useGlobalContext();

  const [notificationsCount] = useState(3); // example only

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openCartSection, setOpenCartSection] = useState(false);

  const redirectToLoginPage = () => navigate("/login");
  const handleCloseUserMenu = () => setOpenUserMenu(false);
  const handleMobileUser = () => {
    if (!user._id) return navigate("/login");
    navigate("/user");
  };

  return (
    <>
      {/* Upper Info Bar - UI Only */}
      <div className="w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs sm:text-sm select-none">
        <div className="container mx-auto flex justify-center sm:justify-between items-center px-4 py-1">
          {/* Hotline */}
          <a
            href="tel:+94112233445"
            className="flex items-center gap-1 hover:text-green-600 transition-colors"
            title="Call our hotline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10l9-7 9 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 21v-6h6v6" />
            </svg>
            <span>Hotline: +94 11 223 3445</span>
          </a>

          {/* Location */}
          <a
            href="https://goo.gl/maps/your-store-location"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1 hover:text-green-600 transition-colors"
            title="Find our store location"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c1.104 0 2-.672 2-1.5S13.104 8 12 8s-2 .672-2 1.5S10.896 11 12 11z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z"
              />
            </svg>
            <span>Store : Dalugama, kelaniya</span>
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
        {/* Top Section */}
        {!(isSearchPage && isMobile) && (
          <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:py-2">
            {/* Logo + Info badge */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="logo"
                  className="hidden lg:block w-40"
                />
                <img
                  src={logo}
                  alt="logo"
                  className="lg:hidden w-28"
                />
              </Link>
              {/* Trust badge */}
              <div className="hidden lg:flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold select-none">
                🚚 Free Shipping on orders over Rs 15000
              </div>
            </div>

            {/* Search (Desktop) */}
            <div className="hidden lg:block flex-1 max-w-lg mx-6">
              <Search />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              {/* Theme Toggle + label */}
              <div className="hidden lg:flex items-center gap-2 select-none">
                <ThemeToggle />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {document.documentElement.classList.contains('dark') ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>

              {/* Notification bell */}
              {user?._id && (
                <button
                  title="Notifications"
                  className="relative text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  <FaBell size={22} />
                  {notificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full">
                      {notificationsCount}
                    </span>
                  )}
                </button>
              )}

              {/* Mobile User Icon */}
              <div className="lg:hidden flex items-center gap-3">
                <ThemeToggle />
                <button
                  onClick={handleMobileUser}
                  className="text-neutral-600 dark:text-neutral-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                >
                  <FaRegCircleUser size={26} />
                </button>
              </div>

              {/* Desktop User Menu + welcome */}
              <div className="hidden lg:flex items-center gap-6">
                {user?._id ? (
                  <>
                    {/* Welcome message */}
                    <span className="text-gray-700 dark:text-gray-300 font-medium select-none">
                      Hello, {user.name || 'User'}
                    </span>
                    <div className="relative">
                      <button
                        onClick={() => setOpenUserMenu(prev => !prev)}
                        className="flex items-center gap-1 font-medium text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      >
                        Account
                        {openUserMenu ? <GoTriangleUp size={20} /> : <GoTriangleDown size={20} />}
                      </button>
                      {openUserMenu && (
                        <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md overflow-hidden animate-fadeIn">
                          <UserMenu close={handleCloseUserMenu} />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <button
                    onClick={redirectToLoginPage}
                    className="px-3 py-1 text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    Login
                  </button>
                )}

                {/* Cart Button */}
                <button
                  onClick={() => setOpenCartSection(true)}
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg text-white transition-all duration-200 hover:scale-105 relative"
                >
                  <div className="animate-bounce">
                    <BsCart4 size={24} />
                  </div>
                  {totalQty > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {totalQty}
                    </span>
                  )}
                  <div className="text-sm font-semibold leading-tight text-left">
                    {cartItem[0] ? (
                      <>
                        <p>{totalQty} Items</p>
                        <p>{DisplayPriceInRupees(totalPrice)}</p>
                      </>
                    ) : (
                      <p>My Cart</p>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search (Mobile) */}
        <div className="container mx-auto px-4 lg:hidden">
          <Search />
        </div>

        {/* Cart Drawer */}
        {openCartSection && (
          <DisplayCartItem close={() => setOpenCartSection(false)} />
        )}
      </header>
    </>
  );
};

export default Header;
