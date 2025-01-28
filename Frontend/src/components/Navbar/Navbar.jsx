import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";

const Navbar = ({ setShowLogin }) => {
  const { cartItems, token, setToken } = useContext(StoreContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menu, setMenu] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Calculate total items in the cart
  const totalItems = Object.values(cartItems).reduce((acc, count) => acc + count, 0);

  // Toggle menu function
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Toggle dropdown for profile options
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Handle user logout
  const handleLogout = () => {
    setToken(null); // Clear the token
    localStorage.removeItem("token"); // Remove token from local storage
    setDropdownOpen(false); // Close dropdown after logout
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>

      {/* Hamburger icon for toggling the menu */}
      <div className={`navbar-hamburger ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <i className={`fa ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
      </div>

      {/* Menu items */}
      <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
        <li>
          <Link
            to="/"
            onClick={() => {
              setMenu("Home");
              setMenuOpen(false);
            }}
            className={menu === "Home" ? "active" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <a
            href="#explore-menu"
            onClick={() => {
              setMenu("Menu");
              setMenuOpen(false);
            }}
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>
        </li>
        <li>
          {/* <a
            href="#app-download"
            onClick={() => {
              setMenu("Mobile-app");
              setMenuOpen(false);
            }}
            className={menu === "Mobile-app" ? "active" : ""}
          >
            Mobile App
          </a> */}
        </li>
        <li>
          <a
            href="#footer"
            onClick={() => {
              setMenu("Contact us");
              setMenuOpen(false);
            }}
            className={menu === "Contact us" ? "active" : ""}
          >
            Contact Us
          </a>
        </li>
      </ul>

      {/* Right section with search, cart, and sign-in */}
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <img src={assets.search_icon} alt="Search" className="icon" />
        </div>
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket" className="icon" />
          </Link>
          {totalItems > 0 && <div className="dot">{totalItems}</div>}
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" onClick={toggleDropdown} />
            {dropdownOpen && (
              <ul className="nav-profile-dropdown">
                <li>
                  <img src={assets.bag_icon} alt="" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={handleLogout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;