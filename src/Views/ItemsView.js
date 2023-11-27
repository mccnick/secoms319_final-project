import { useContext, useState } from "react";
import { CartContext, items } from "../CartContextLogic";
import { PageContext } from "../PageContextLogic";

// ItemsLogic component handles the logic for item listing and search
export const ItemsLogic = () => {
  // cart operations and page state
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { setPage } = useContext(PageContext);

  // managing search term and toast message
  const [searchTerm, setSearchTerm] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // filter items based on search term
  const filteredItems = items.filter(
    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()) // include lowercase
  );

  // add item method and toast message
  const addItemToCart = (item) => {
    addToCart(item);
    setToastMessage(`Added to cart: ${item.name}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // remove item method and toast message
  const removeItemFromCart = (item) => {
    removeFromCart(item);
    setToastMessage(`Removed from cart: ${item.name}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div>
      {/* Toast notification and UI  */}
      {showToast && (
        <div className="fixed top-5 bg-purple-500 text-white left-1/2 transform -translate-x-7 p-4 rounded font-bold z-50">
          {toastMessage}
        </div>
      )}
      <div className="bg-gray-400">
        <div className="lg:px-8 sm:px-6 mx-auto max-w-2xl sm:py-12 py-8 lg:max-w-7xl px-4">
          <div className="flex justify-between items-center text-center">
            {/* Adjusted Developer Info Button */}
            <button
              onClick={() => setPage("author")}
              type="button"
              className="bg-black shadow-sm px-3.5 font-semibold text-sm text-white py-2.5 hover:bg-purple-600 gap-x-4 rounded-md">
              Developer Info
            </button>

            <h1 className="text-3xl font-bold">
              {" "}
              Browse metalcore merch below!{" "}
            </h1>

            {/* Search Input */}
            <input
              type="text"
              className="focus:border-black bg-black text-white rounded-md px-3 py-2 border-purple-500 white-cursor" // Use text-white for font color
              style={{ width: "150px" }} // Adjust the width as needed
              placeholder="Search here.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
              onClick={() => setPage("cart")}
              type="button"
              className="bg-black shadow-sm px-3.5 font-semibold text-sm text-white flex py-2.5 hover:bg-purple-600 gap-x-4 rounded-md">
              {/* cart icon when adding to cart */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cart4"
                viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
              </svg>

              {cart.length}
            </button>
          </div>
          {/* Line Break */}
          <div className="border-t border-black my-4"></div>{" "}
          {/* Adjust 'my-4' for margin */}
          {/* grid layout for items */}
          <div className="lg:grid-cols-4  grid-cols-1 gap-x-3  xl:gap-x-8  mt-6 grid sm:grid-cols-2 gap-y-3">
            {/* mapping filtered items to create item cards */}
            {filteredItems.map((item) => (
              <div>
                <div key={item.id} className="group relative">
                  <div className="overflow-hidden w-full bg-gray-200 aspect-w-1 aspect-h-1 lg:h-80 lg:aspect-none ">
                    {/* Item image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-center h-full rounded-md lg:h-full w-full object-cover lg:w-full border border-gray-500"
                    />
                  </div>

                  {/* item name and price */}
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm font-semibold">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.name}
                      </h3>
                    </div>
                    <p className="font-medium text-sm text-gray-900">
                      ${item.price}
                    </p>
                  </div>
                </div>

                {/* buttons to add or remove item from cart */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => addItemToCart(item)}
                    type="button"
                    className="px-3 text-sm text-white rounded-md hover:bg-purple-600 shadow-sm w-full py-2 font-bold bg-black">
                    Add to cart
                  </button>

                  {/* cart icon when removing from cart */}
                  <button
                    onClick={() => removeItemFromCart(item)}
                    type="button"
                    className="rounded-md text-sm px-3 py-2 w-full text-white bg-black hover:bg-purple-600 font-bold shadow-sm">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
