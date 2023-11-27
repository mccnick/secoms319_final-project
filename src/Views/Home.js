// Home.js
import React, { useContext } from "react";
import { PageContext } from "../PageContextLogic"; // Adjust the import path as needed

const Home = () => {
  const { setPage } = useContext(PageContext);

  // Styles
  const homeStyle = {
    color: "white",
    textAlign: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Adjusted for spacing
    alignItems: "center",
    backgroundImage:
      "url(https://badomensofficial.com/cdn/shop/t/34/assets/bo-bg-1.gif?v=36669565811230596921698939694)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    padding: "0 20px", // Added padding to prevent text from touching the edges
  };

  const textStyle = {
    marginBottom: "400px", // Pushes the text up by increasing margin at the bottom
    fontSize: "1.2rem",
    maxWidth: "600px",
  };

  const buttonStyle = {
    marginBottom: "200px", // Increase as needed to push the button further down
    fontSize: "20px",
    padding: "10px 20px",
    backgroundColor: "#444",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
  };

  return (
    <div style={homeStyle}>
      <div style={textStyle}>
        <h1 style={{ fontSize: "2.5rem", margin: "0 0 30px" }}>
          Welcome to the Metalcore Merchandise online store.
        </h1>
        <p>The images used on this demo website is from the bands' websites.</p>
        <p>Thanks for stopping by!</p>
      </div>
      <button style={buttonStyle} onClick={() => setPage("items")}>
        Start Browsing
      </button>
    </div>
  );
};

export default Home;
