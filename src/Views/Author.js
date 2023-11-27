import React, { useContext } from "react"; // Import useContext here
import { PageContext } from "../PageContextLogic"; // Adjust the import path based on your project structure

// Author.js
const Author = () => {
  const { setPage } = useContext(PageContext); // Use PageContext to get the setPage function
  return (
    <div className="min-h-screen bg-gray-400">
      {/* Ensure full height and set background color */}
      <div className="container mx-auto mt-4 bg-gray-400">
        <h2 className="text-center text-2xl font-bold bg-gray-400">
          COMS-319: Construction of User Interfaces
        </h2>
        <p className="text-center mt-2">
          Final Project Phase 2:{" "}
          <a
            href="https://github.com/mccnick/secoms319/tree/main/Final_Project_Phase2"
            className="text-blue-600 hover:text-blue-800 bg-gray-400">
            GitHub Repository
          </a>
          <br />
          Developed by Nick McCullough
          <br />
          Email: nickmcc@iastate.edu
          <br />
          Due Date: 11/28/2023
          <br />
          Instructor: Professor Abraham Aldaco, Ph.D.
        </p>

        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden mt-4 bg-gray-400">
          <div className="md:w-1/3">
            <img
              src="https://media.licdn.com/dms/image/D5603AQEkoPXFb0uf7Q/profile-displayphoto-shrink_800_800/0/1697099449588?e=1702512000&v=beta&t=LAXANRT7MrZHTFv8JCe_2rd-dzzweWlj3gqgm-lgP6Y"
              alt="Nick Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="md:w-2/3 p-4">
            <h5 className="text-lg font-bold">Nick McCullough</h5>
            <p className="mt-2">
              <strong>Major:</strong> Software Engineering
              <br />
              <strong>Hobbies:</strong>
              <ul className="list-disc list-inside">
                <li>
                  Listening to Metalcore of course - Bad Omens, Spiritbox, Sleep
                  Token, etc.
                </li>
                <li>Spending time with family and friends</li>
                <li>Gaming - Valorant, COD, Fortnite</li>
                <li>Traveling</li>
              </ul>
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
              frontend experience. He enjoys learning frontend development and
              finds it useful.
            </p>

            <p className="mt-2">
              The merchandise pictures used in this website were from the band's
              social media/website.
            </p>
            {/* Add Return Button */}
            <button
              onClick={() => setPage("items")} // Adjust "items" to the correct page identifier for your ItemsView
              className="text-sm font-bold px-3.5 py-2.5 rounded-md hover:bg-purple-600 bg-black text-white shadow-sm mt-4">
              ← TAKE ME BACK TO METALCORE MERCH!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
