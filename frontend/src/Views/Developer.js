import { useContext, useState, useEffect } from "react";

import { PageContext } from "../PageContextLogic";
import axios from "axios";

// icon imports
import {
  FaNodeJs,
  FaDatabase,
  FaReact,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import { SiNodemon, SiExpress, SiAxios, SiTailwindcss } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";

const Author = () => {
  const { setPage } = useContext(PageContext);
  const [selectedItemId, setSelectedItemId] = useState(""); // State for the selected item ID
  const [newPrice, setNewPrice] = useState(""); // State for the new price
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    image: "",
    rating: 1,
  });

  // Function to handle the deletion of an item
  const handleDelete = async (itemId) => {
    if (!itemId) {
      // Optionally show an error message that no item is selected
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8081/items/${itemId}`
      );
      if (response.data.success) {
        // Remove the deleted item from the local state
        setItems(items.filter((item) => item.id !== itemId));
        setSelectedItem({ id: "", price: "" }); // Reset selected item
        // Optionally, show a success message
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      // Optionally, handle the error, such as showing an error message
    }
  };

  // Function to handle the price update of an item
  const handleUpdatePrice = async (id, newPrice) => {
    try {
      await axios.put(`http://localhost:8081/items/${id}`, { price: newPrice });
      // Handle state update or page refresh here to reflect changes
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  const handleAddNewItem = async () => {
    const { name, price, image, rating } = newItem;
    try {
      const response = await axios.post("http://localhost:8081/items", {
        name,
        price,
        image,
        rating,
      });
      if (response.data.success) {
        console.log("New item added successfully");
        setNewItem({ name: "", price: "", image: "", rating: 1 }); // Reset the form and set rating back to 1
        // Optionally, update the items state or display a success message
      }
    } catch (error) {
      console.error("Error adding new item:", error);
      // Optionally, handle the error, such as displaying an error message
    }
  };

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({ id: "", price: "" });

  // Fetch items from the backend when component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8081/items");
        setItems(response.data);
      } catch (error) {
        console.error("Couldn't fetch items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-400">
      <div className="container mx-auto bg-gray-400">
        <h2 className="text-center text-2xl font-bold bg-gray-400 pt-3">
          COMS-319: Construction of User Interfaces
        </h2>
        <p className="text-center mt-2">
          Solo Developed by: Nick McCullough
          <br />
          Professor: Abraham Aldaco, Ph.D.
          <br />
          Final Project Repository:{" "}
          <a
            href="https://github.com/mccnick/secoms319_final-project"
            className="text-blue-600 hover:text-blue-800 bg-gray-400">
            GitHub
          </a>
          <br />
          Email: nickmcc@iastate.edu
          <br />
          Due Date: 12/3/2023
          <br />
          <br />
        </p>
        <div className="md:flex-row shadow-lg rounded-lg overflow-hidden bg-gray-300">
          <h2 className="text-center text-2xl font-bold bg-purple-600">
            Technologies used to build this (S E R N) website:
            <div className="flex justify-center items-center space-x-4 pb-4 pt-4">
              {/* flex container for icons */}

              <FaDatabase size={50} title="MySQL" />
              <SiExpress size={50} title="Express" />
              <FaReact size={50} title="React" />
              <FaNodeJs size={50} title="NodeJS" />
              <SiNodemon size={50} title="Nodemon" />
              <IoLogoJavascript size={50} title="JavaScript" />
              <FaHtml5 size={50} title="HTML5" />
              <FaCss3Alt size={50} title="CSS3" />
              <SiTailwindcss size={50} title="TailwindCSS" />
              <SiAxios size={50} title="Axios" />
            </div>
          </h2>
          <p className="text-center mt-2">
            The merchandise pictures used in this website were from the band's
            social media/website.
          </p>
          <p className="text-center mt-2">
            I decided to use URL Image addresses rather than downloading images
            to my device.
          </p>
          <p className="text-center mt-2 pb-2">
            In the case an image is no longer available, I can easily add a new
            item / image through the existing MySQL database.
          </p>
        </div>

        <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden mt-4 bg-gray-300">
          <div className="md:w-1/3">
            <img
              src="https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/242514478_10223647137104764_7794972867059718420_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=YDh6I6WDfVoAX9R0kk_&_nc_ht=scontent-ord5-2.xx&oh=00_AfCx97cQPHGC_3k9U4lCfkAS4BNxwqS_WIoaBWYjBItY5w&oe=657CB074"
              alt="Nick Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="md:w-2/3 p-4">
            <h5 className="text-lg font-bold">
              {" "}
              Developer Info - Nick McCullough
            </h5>
            <p className="mt-2">
              <strong>Major:</strong> Software Engineering
              <br />
            </p>
            <p className="mt-2">
              <strong>Bio:</strong> Nick is a non-traditional student,
              previously from a finance background before going back to college.
              He is a rising Junior at Iowa State majoring in Software
              Engineering. Nick is joining Collins Aerospace in 2024 as an
              Avionics/Mission Flight Software Engineer through an 8 month Co-Op
              and previously interned at John Deere.
            </p>
            <p className="mt-2">
              Nick has experience with Git, GitHub, JavaScript, ReactJS from
              building his personal portfolio website. Prior to that, he had no
              frontend experience. He enjoys learning frontend development in
              SE319 and finds it useful.
            </p>

            <p className="mt-2">
              <strong>Hobbies:</strong>
              <br />
            </p>
            <ul className="list-disc list-inside">
              <li>
                Listening to Metalcore of course - Bad Omens, Spiritbox, Sleep
                Token, etc.
              </li>
              <li>Spending time with family and friends</li>
              <li>Gaming - Valorant, COD, Fortnite</li>
              <li>
                Helping friends / classmates in my ISU Tech discord community
              </li>
              <li>Building / iterating upon my PC desk setup</li>
              <li>Buying too many sneakers</li>
              <li>Learning new tech</li>
              <li>Traveling</li>
            </ul>

            {/* Return Button */}
            <button
              onClick={() => setPage("items")}
              className="text-sm font-bold px-3.5 py-2.5 rounded-md hover:bg-purple-600 bg-black text-white shadow-sm mt-4">
              ← TAKE ME BACK TO METALCORE MERCH!
            </button>
          </div>
        </div>
        {/* Spotify Playlist Embed */}
        <div className="mt-4 pb-4">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/37i9dQZF1E4ndbGDq9JtGb?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"></iframe>
        </div>
      </div>
      <div className="container mx-auto p-6 bg-gray-300 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-8">
          Hello Developer, Update Items Here:
        </h2>
        {/* -------------------------------------*/}
        {/* ---------- DELETE Section ---------- */}
        {/* -------------------------------------*/}
        <div className="mb-10 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-red-600 mb-4">
            Delete an Item
          </h3>
          <div className="flex flex-col space-y-4">
            {/* Dropdown for selecting item to delete */}
            <select
              value={selectedItem.id}
              onChange={(e) => {
                const item = items.find(
                  (item) => item.id.toString() === e.target.value
                );
                setSelectedItem(item || { id: "", price: "" });
              }}
              className="form-select block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500">
              <option value="">Select an item</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {`${item.name} - $${item.price}`}
                </option>
              ))}
            </select>

            {/* Button to delete the selected item */}
            <button
              onClick={() => handleDelete(selectedItem.id)}
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors">
              Delete Item
            </button>
          </div>
        </div>
        {/* ----------------------------------*/}
        {/* ---------- POST Section ---------- */}
        {/* ----------------------------------*/}
        <div className="mb-10 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">
            Add a New Item
          </h3>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="form-input px-4 py-3 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Item Price (example: 200.00)"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
              className="form-input px-4 py-3 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="URL Image Address"
              value={newItem.image}
              onChange={(e) =>
                setNewItem({ ...newItem, image: e.target.value })
              }
              className="form-input px-4 py-3 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {/* Input for Rating */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700">
              </label>
              <select
                id="rating"
                name="rating"
                value={newItem.rating}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    rating: parseInt(e.target.value, 10),
                  })
                }
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm">
                <option value="" disabled>
                  Rating
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <button
              onClick={handleAddNewItem}
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
              Add New Item
            </button>
          </div>
        </div>

        {/* ----------------------------------*/}
        {/* ---------- PUT Section ---------- */}
        {/* ----------------------------------*/}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-green-600 mb-4">
            Update Item's Price
          </h3>
          <div className="flex flex-col space-y-4">
            {/* Dropdown for selecting item */}
            <select
              value={selectedItem.id}
              onChange={(e) => {
                const item = items.find(
                  (item) => item.id.toString() === e.target.value
                );
                setSelectedItem(item || { id: "", price: "" });
              }}
              className="form-select block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
              <option value="">Select an item</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {`${item.name} - $${item.price}`}
                </option>
              ))}
            </select>

            {/* Input for new price */}
            <input
              type="text"
              placeholder="New Price"
              value={selectedItem.price}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, price: e.target.value })
              }
              className="form-input px-4 py-3 rounded-md border-2 border-gray-300 focus:outline-none focus:border-green-500"
            />

            {/* Button to submit new price */}
            <button
              onClick={() =>
                handleUpdatePrice(selectedItem.id, selectedItem.price)
              }
              className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
              Update Price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
