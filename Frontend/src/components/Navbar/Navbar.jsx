import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets'; 
import './Navbar.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext'; 

const Navbar = ({ setShowLogin }) => { 
  const { cartItems } = useContext(StoreContext); 
  const [menu, setMenu] = useState('Home');

  // Calculate total items in the cart
  const totalItems = Object.values(cartItems).reduce((acc, count) => acc + count, 0);

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to='/'><img src={assets.logo} alt="logo" className="logo" /></Link>

      {/* Menu items */}
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu('Home')} className={menu === 'Home' ? 'active' : ''}>
          Home
        </Link>
        <a href='#explore-menu' onClick={() => setMenu('Menu')} className={menu === 'Menu' ? 'active' : ''}>
          Menu
        </a>
        <a href='#app-download' onClick={() => setMenu('Mobile-app')} className={menu === 'Mobile-app' ? 'active' : ''}>
          Mobile-app
        </a>
        <a href='#Footer' onClick={() => setMenu('Contact us')} className={menu === 'Contact us' ? 'active' : ''}>
          Contact us
        </a>
      </ul>

      {/* Right section with icons and sign-in button */}
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <img src={assets.search_icon} alt="Search" className="icon" />
        </div>
        <div className="navbar-basket-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="Basket" className="icon" />
          </Link>
          {totalItems > 0 && <div className="dot">{totalItems}</div>} 
        </div>
        <button onClick={() => setShowLogin(true)}>Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
