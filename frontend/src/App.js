// context import from React
import React from "react";
import { useContext } from "react";
import { useState } from 'react';
import Home from './Views/Home';
import { CartLogic } from "./Views/CartView";
import { ItemsLogic } from "./Views/ItemsView";
import { ConfirmLogic } from "./Views/ConfirmView";
import { PageContext } from "./PageContextLogic";
import Developer from "./Views/Developer";
import Navbar from "./Navbar";



// ---------------------------
// -------- export -----------
// ---------------------------
export const App = () => {
  const { page } = useContext(PageContext);


  if (page === "items") { return <ItemsLogic />; }
  if (page === "cart") { return <CartLogic />; }
  if (page === "confirmation") { return <ConfirmLogic />; }
  
  return (
    <>
      <Navbar /> {/* Include the Navbar at the top */}
      {page === "home" && <Home />}
      {page === "items" && <ItemsLogic />}
      {page === "cart" && <CartLogic />}
      {page === "author" && <Developer />}


      {page !== "home" && page !== "items" && page !== "cart" && page !== "confirmation" && page !== "author" && <div>Page not found.</div>}
    </>
  );
};