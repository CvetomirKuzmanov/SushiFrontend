import { useState, useEffect, useRef } from "react";
import { supabase } from "../config/supabase";

export default function Nav() {
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const cartRef = useRef(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsMenuDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo  */}
        <a href="/" className="font-['Pacifico'] text-2xl text-primary">
          Friends
        </a>

        {/* Main Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a
            href="/"
            className="text-text font-medium hover:text-primary transition-colors"
          >
            Home
          </a>

          {/* Menu dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsMenuDropdownOpen((prev) => !prev)}
              className="text-gray-900 font-medium hover:text-primary transition-colors flex items-center"
              aria-expanded={isMenuDropdownOpen}
            >
              <span>Menu</span>
              <div className="w-4 h-4 ml-1 flex items-center justify-center">
                <i className="ri-arrow-down-s-line"></i>
              </div>
            </button>
            {isMenuDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Sushi
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Sushi
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Somethg else
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Drinks
                </a>
              </div>
            )}
          </div>

          <a
            href="#"
            className="text-gray-900 font-medium hover:text-primary transition-colors"
          >
            New Arrivals
          </a>
          <a
            href="#"
            className="text-gray-900 font-medium hover:text-primary transition-colors"
          >
            Sale
          </a>
          <a
            href="#"
            className="text-gray-900 font-medium hover:text-primary transition-colors"
          >
            About
          </a>
        </nav>

        {/* Utility Icons */}
        <div className="flex items-center space-x-6">
          {/* Search button */}
          <div className="relative">
            <button
              id="searchToggle"
              className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary transition-colors"
            >
              <i className="ri-search-line text-xl"></i>
            </button>
            <div
              id="searchDropdown"
              className="hidden absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-400">
                  <i className="ri-search-line"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Account / Auth Icons */}
          {user ? (
            <>
              {/* Profile dropdown for logged-in user */}
              <div ref={profileDropdownRef} className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
                  className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary transition-colors"
                  title={`Logged in as ${user.email}`}
                  aria-expanded={isProfileDropdownOpen}
                >
                  <i className="ri-user-line text-xl"></i>
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      My Account
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Orders
                    </a>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              
              {/* Cart */}
              <div ref={cartRef} className="relative">
                <button
                  onClick={() => setIsCartOpen((prev) => !prev)}
                  className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary transition-colors"
                >
                  <i className="ri-shopping-bag-line text-xl"></i>
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </button>
                {isCartOpen && (
                  <div
                    id="cartDropdown"
                    className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4"
                  >
                    <h3 className="font-medium text-gray-900 mb-3">
                      Your Cart (3)
                    </h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                      <div className="flex items-center space-x-3">
                        <img
                          src="https://readdy.ai/api/search-image?query=minimalist%20white%20t-shirt%20on%20clean%20background%2C%20professional%20product%20photography%2C%20high%20quality%2C%20detailed%20fabric%20texture&width=80&height=80&seq=prod1&orientation=squarish"
                          alt="Product"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">
                            Essential White T-Shirt
                          </h4>
                          <p className="text-xs text-gray-500">
                            Size: M | Qty: 1
                          </p>
                          <p className="text-sm font-medium">$24.99</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <i className="ri-close-line"></i>
                        </button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <img
                          src="https://readdy.ai/api/search-image?query=minimalist%20black%20jeans%20on%20clean%20background%2C%20professional%20product%20photography%2C%20high%20quality%2C%20detailed%20fabric%20texture&width=80&height=80&seq=prod2&orientation=squarish"
                          alt="Product"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">
                            Slim Fit Black Jeans
                          </h4>
                          <p className="text-xs text-gray-500">
                            Size: 32 | Qty: 1
                          </p>
                          <p className="text-sm font-medium">$59.99</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <i className="ri-close-line"></i>
                        </button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <img
                          src="https://readdy.ai/api/search-image?query=minimalist%20leather%20watch%20on%20clean%20background%2C%20professional%20product%20photography%2C%20high%20quality%2C%20detailed%20texture&width=80&height=80&seq=prod3&orientation=squarish"
                          alt="Product"
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">
                            Classic Leather Watch
                          </h4>
                          <p className="text-xs text-gray-500">
                            Color: Brown | Qty: 1
                          </p>
                          <p className="text-sm font-medium">$129.99</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <i className="ri-close-line"></i>
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex justify-between mb-3">
                        <span className="text-sm text-gray-600">Subtotal</span>
                        <span className="text-sm font-medium">$214.97</span>
                      </div>
                      <div className="space-y-2">
                        <a
                          href="#"
                          className="block w-full py-2 px-4 bg-primary text-white text-center font-medium rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap"
                        >
                          Checkout
                        </a>
                        <a
                          href="#"
                          className="block w-full py-2 px-4 bg-gray-100 text-gray-800 text-center font-medium rounded-button hover:bg-gray-200 transition-colors whitespace-nowrap"
                        >
                          View Cart
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
  
          ) : (
            // Not logged in user profile dropdown using click toggle
            <div ref={profileDropdownRef} className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
                className="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary transition-colors"
                aria-expanded={isProfileDropdownOpen}
              >
                <i className="ri-user-line text-xl"></i>
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded">
                  <a
                    href="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Sign In
                  </a>
                  <a
                    href="/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Register
                  </a>
                </div>
              )}
            </div>
          )}


          <button
            onClick={toggleMenu}
            className="block md:hidden w-8 h-8 text-gray-700 hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            <i className="ri-menu-line text-3xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <a
            href="/"
            className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-50"
          >
            Home
          </a>
          {/* You can add a mobile menu dropdown here if needed */}
          <a
            href="#"
            className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-50"
          >
            Menu
          </a>
          <a
            href="#"
            className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-50"
          >
            New Arrivals
          </a>
          <a
            href="#"
            className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-50"
          >
            Sale
          </a>
          <a
            href="#"
            className="block px-4 py-3 text-gray-900 font-medium hover:bg-gray-50"
          >
            About
          </a>
        </nav>
      )}
    </header>
  );
}
