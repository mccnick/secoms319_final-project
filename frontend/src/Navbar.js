import React, { useContext } from 'react';
import { PageContext } from './PageContextLogic';

const Navbar = () => {
  const { page, setPage } = useContext(PageContext);

  // Inline CSS for the navbar
  const navbarStyle = {
    backgroundColor: '#333',
    color: 'white',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-around',
  };

  const buttonStyle = {
    backgroundColor: '#555',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '5px',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#7e22ce',
    fontWeight: 'bold',
  };

  return (
    <nav style={navbarStyle}>
      <button 
        style={page === "home" ? activeButtonStyle : buttonStyle} 
        onClick={() => setPage("home")}>
        Home
      </button>
      <button 
        style={page === "items" ? activeButtonStyle : buttonStyle} 
        onClick={() => setPage("items")}>
        Shop
      </button>
      <button 
        style={page === "author" ? activeButtonStyle : buttonStyle} 
        onClick={() => setPage("author")}>
        Developer
      </button>
      {/* Add more navigation buttons as needed */}
    </nav>
  );
};

export default Navbar;
