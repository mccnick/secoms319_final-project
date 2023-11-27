import { createContext, useState } from "react";


export const items = require("./shopItems.json");

export const CartContext = createContext({

  // initializations
  cart: [],
  cardNumber: "",
  city: "",
  custName: "",
  expirationDate: "",
  state: "",
  streetAddress: "",
  zip: "",
  
  // methods/functions
  addToCart: (item) => {},
  removeFromCart: (item) => {},
  setName: (custName) => {},
  setStreetAddress: (streetAddress) => {},
  setExpirationDate: (expirationDate) => {},
  setCity: (city) => {},
  setState: (state) => {},
  setZip: (zip) => {},
  setCardNumber: (cardNumber) => {},
  
  // pricing calculations
  total: 0,
  subtotal: 0,
  taxes: 0,

  clearCart: () => {},
});

// CartContextLogic.js
export const CartLogic = ({ children }) => {

  // initialization state variables for card and user info
  const [cardNumber, setCardNumber] = useState("");
  const [cart, setCart] = useState([]);
  const [city, setCity] = useState("");
  const [custName, setName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [taxes, setTaxes] = useState(0);
  const [total, setTotal] = useState(0);
  const [state, setState] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [zip, setZip] = useState("");

  // tax rate
  const TAX_RATE = 0.07;

  // methods/functions to modify state variables
  const clearCart = () => {
    setCart([]);
    setSubtotal(0);
    setTaxes(0);
    setTotal(0);
  };

  // add item to cart
  const addToCart = (item) => {
    const newCart = [...cart, item];

    // calculate new subtotal, taxes, and total
    let newSubtotal = newCart.reduce((acc, item) => acc + item.price, 0);
    newSubtotal = Math.round(newSubtotal * 100) / 100;  
    const taxAmount = newSubtotal * TAX_RATE;
    const newTotal = Math.round((newSubtotal + taxAmount) * 100) / 100;
  
    // set state variables
    setSubtotal(newSubtotal);
    setTotal(newTotal);
    setTaxes(taxAmount);
    setCart(newCart);
  };

  // remove item from cart
  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const index = prevCart.lastIndexOf(item);

      if (index < 0) return prevCart;

      const newCart = [
        ...prevCart.slice(0, index),
        ...prevCart.slice(index + 1, prevCart.length),
      ];

      // calculate new subtotal, taxes, and total, set state variables
      const newSubtotal = newCart.reduce((acc, item) => acc + item.price, 0);
      const taxAmount = newSubtotal * TAX_RATE;
      setSubtotal(newSubtotal);
      setTaxes(taxAmount);
      setTotal(newSubtotal + taxAmount);

      return newCart;
    });
  };

  // providing the state and functions through context to children components
  return (
    <CartContext.Provider
      value={{

        // state variables
        cardNumber,
        cart,
        city,
        custName,
        expirationDate,
        state,
        streetAddress,
        subtotal,
        taxes,
        total,
        zip,
        
        // functions
        addToCart,
        clearCart,
        removeFromCart,
        setCardNumber,
        setCity,
        setExpirationDate,
        setName,
        setState,
        setStreetAddress,
        setZip,
      }}
    >
      
      {children}
    </CartContext.Provider>
  );
};
