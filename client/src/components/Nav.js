import React from "react";

const Nav = () => {
  let links = [{ name: "HOME", link: "/" }];

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center  text-gray-800">
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="pin"></ion-icon>
          </span>
          DocTrack
        </div>
        <ul className="md:flex md:items-center">
          <li className="md:ml-8 text-xl">
            <a
              href="/"
              className="text-gray-800 hover:text-gray-400 duration-500"
            >
              Home
            </a>
          </li>
          <li className="md:ml-8 text-xl">
            <a
              href="/documents"
              className="text-gray-800 hover:text-gray-400 duration-500"
            >
              Documents
            </a>
          </li>
          <li className="md:ml-8 text-xl">
            <form action="http://localhost:3001/login/logout" method="get">
              <button
                onClick={() => localStorage.clear()}
                type="submit"
                className="bg-indigo-600 py-2 px-6 md:ml-8 rounded text-white hover:bg-indigo-800"
              >
                Sign out
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
