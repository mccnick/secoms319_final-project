// Home.js
import React, { useContext } from "react";
import { PageContext } from "../PageContextLogic"; 

const Home = () => {
  const { setPage } = useContext(PageContext);

  // Styles
  const homeStyle = {
    color: "white",
    textAlign: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "url(https://badomensofficial.com/cdn/shop/t/34/assets/bo-bg-1.gif?v=36669565811230596921698939694)", // this is the home page gif
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    padding: "0 20px",
  };

  const textStyle = {
    marginBottom: "400px", // pushes the text up by increasing margin at the bottom
    fontSize: "1.2rem",
    maxWidth: "600px",
  };

  const buttonStyle = {
    marginBottom: "200px", // adjust to move the button up or down
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
        <p>The images used on this demo website are from the bands' websites.</p>
        <p>Thanks for stopping by!</p>
      </div>
      <button style={buttonStyle} onClick={() => setPage("items")}>
        Start Browsing
      </button>
    </div>
  );
};

export default Home;
