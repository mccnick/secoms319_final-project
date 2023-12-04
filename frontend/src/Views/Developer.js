import React, { useContext } from "react";
import { PageContext } from "../PageContextLogic";

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
          I decided to use URL Image addresses rather than downloading images to
          my device.
        </p>
        <p className="text-center mt-2 pb-2">
          In the case an image is no longer available, I can easily add a new
          item / image through the existing MySQL database.
        </p>
        </div>

        <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden mt-4 bg-gray-300">
          <div className="md:w-1/3">
            <img
              src="https://scontent-ord5-2.xx.fbcdn.net/v/t39.30808-6/242514478_10223647137104764_7794972867059718420_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=0E8KffWGwHgAX--73bG&_nc_ht=scontent-ord5-2.xx&oh=00_AfCjQfcj4EIXKxjPXHVwmVKm0UXiAXiSn-wVmcqLAPMn2A&oe=6570D2F4"
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
    </div>
  );
};

export default Author;
