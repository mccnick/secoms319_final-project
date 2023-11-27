// Navbar.js
import React, { useContext } from 'react';
import { PageContext } from './PageContextLogic'; // Adjust the import path as needed

const Navbar = () => {
  const { setPage } = useContext(PageContext);

  // Inline CSS for the navbar
  const navbarStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-around', // Adjust as per your layout needs
  };

  const buttonStyle = {
    backgroundColor: '#555',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '5px',
  };

  return (
    <nav style={navbarStyle}>
      <button style={buttonStyle} onClick={() => setPage("home")}>Home</button>
      <button style={buttonStyle} onClick={() => setPage("items")}>Items</button>
      <button style={buttonStyle} onClick={() => setPage("cart")}>Cart</button>
      <button style={buttonStyle} onClick={() => setPage("author")}>Author</button>
      {/* Add more navigation buttons as needed */}
    </nav>
  );
};

export default Navbar;
