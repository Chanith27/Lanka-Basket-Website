import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
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

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openCartSection, setOpenCartSection] = useState(false);

  const redirectToLoginPage = () => navigate("/login");
  const handleCloseUserMenu = () => setOpenUserMenu(false);
  const handleMobileUser = () => {
    if (!user._id) return navigate("/login");
    navigate("/user");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      {/* Top Section */}
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center justify-between px-4 py-3 lg:py-2">
          {/* Logo */}
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

          {/* Search (Desktop) */}
          <div className="hidden lg:block flex-1 max-w-lg mx-6">
            <Search />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>

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

            {/* Desktop User Menu */}
            <div className="hidden lg:flex items-center gap-6">
              {user?._id ? (
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
                className="flex items-center gap-2 bg-green-700 hover:bg-green-600 px-4 py-2 rounded-lg text-white transition-all duration-200 hover:scale-105"
              >
                <div className="animate-bounce">
                  <BsCart4 size={24} />
                </div>
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
  );
};

export default Header;
