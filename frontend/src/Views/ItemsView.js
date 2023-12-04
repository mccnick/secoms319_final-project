import { useContext, useState, useEffect } from "react";
import { CartContext } from "../CartContextLogic";
import { PageContext } from "../PageContextLogic";
import StarRating from "../StarRating";
import axios from "axios";

export const ItemsLogic = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { setPage } = useContext(PageContext);

  // state for items, search term, and toast message
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8081/items");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  // filter items based on search term to lowercase
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleRatingChange = async (newRating, itemId) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/ratings/${itemId}`,
        { rating: newRating }
      );
      if (response.status === 200) {
        console.log(`Rating updated for item ${itemId}: ${newRating}`);

        // Update the items state to reflect the new rating
        setItems(
          items.map((item) => {
            if (item.id === itemId) {
              return { ...item, rating: newRating };
            }
            return item;
          })
        );
      }
    } catch (error) {
      console.error(`Error updating rating for item ${itemId}:`, error);
    }
  };

  // temporary rating field for demonstration purposes
  const itemsWithRatings = items.map((item) => ({ ...item, rating: 5 }));

  return (
    <div>
      {/* Toast notification */}
      {showToast && (
        <div
          style={{
            top: "162px", // had trouble with tailwind toast alignment
            position: "fixed",
            left: "65%",
            transform: "translateX(-50%)",
            backgroundColor: "#7e22ce",
            color: "white",
            padding: "1rem",
            borderRadius: "0.5rem",
            zIndex: 50,
            width: "40%", 
            maxWidth: "575px", 
            whiteSpace: "nowrap", 
            overflow: "hidden", 
            textOverflow: "ellipsis", 
            fontWeight: "bold", 
          }}>
          {toastMessage}
        </div>
      )}

      {/* Main container */}
      <div className="bg-gray-400">
        <div className="lg:px-8 sm:px-6 mx-auto max-w-2xl sm:py-12 py-8 lg:max-w-7xl px-4">
          {/* Header section */}
          <div className="flex justify-between items-center text-center">
            {/* Home Button */}
            <button
              onClick={() => setPage("home")}
              type="button"
              className="bg-black shadow-sm px-3.5 font-semibold text-sm text-white py-2.5 hover:bg-purple-600 gap-x-4 rounded-md">
              Home
            </button>
            {/* Developer Info Button */}
            <button
              onClick={() => setPage("author")}
              type="button"
              className="bg-black shadow-sm px-3.5 font-semibold text-sm text-white py-2.5 hover:bg-purple-600 gap-x-4 rounded-md">
              Developer Info
            </button>

            {/* Title */}
            <h1 className="text-3xl font-bold">
              Listen while you browse merch!
            </h1>

            {/* Search Input */}
            <input
              type="text"
              className="focus:border-black bg-black text-white rounded-md px-3 py-2 border-purple-500 white-cursor"
              style={{ width: "150px" }}
              placeholder="Search here.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Cart Button */}
            <button
              onClick={() => setPage("cart")}
              type="button"
              className="bg-black shadow-sm px-3.5 font-semibold text-sm text-white flex py-2.5 hover:bg-purple-600 gap-x-4 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-cart4"
                viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5 a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1 a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1 a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1 a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
              </svg>
              {cart.length}
            </button>
          </div>

          {/* Line Break */}
          <div className="border-t border-black my-4"></div>

          {/* Spotify Playlist Embed */}
          <div className="my-4">
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/playlist/2Lync0FUDot9lOwZ7Eu9f2?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"></iframe>
          </div>

          {/* Line Break */}
          <div className="border-t border-black my-4"></div>

          {/* Grid layout for items */}
          <div className="lg:grid-cols-4 grid-cols-1 gap-x-3 xl:gap-x-8 mt-6 grid sm:grid-cols-2 gap-y-3">
            {/* Mapping filtered items to create item cards */}
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative">
                <div className="bg-gray-400 rounded-md overflow-hidden w-full aspect-w-1 aspect-h-1 lg:h-80 lg:aspect-none mb-4">
                  {/* Item image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-center h-full rounded-md lg:h-full w-full object-cover lg:w-full border-[1.25px] border-black"
                  />
                </div>

                {/* Star Rating with padding */}
                <div className="">
                  <StarRating
                    initialRating={item.rating || 3}
                    onRatingChange={(newRating) =>
                      handleRatingChange(newRating, item.id)
                    }
                  />
                </div>

                {/* Item name and price */}
                <div className="mt-2 flex justify-between">
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="font-medium text-sm text-gray-900">
                    ${item.price}
                  </p>
                </div>

                {/* Buttons to add or remove item from cart */}
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => addItemToCart(item)}
                    type="button"
                    className="px-3 text-sm text-white rounded-md hover:bg-purple-600 shadow-sm w-full py-2 font-bold bg-black">
                    Add to cart
                  </button>
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
