import React from "react";
import RestaurantCard from "./components/RestaurantCard";
import Sidebar from "./components/Sidebar";

function Search() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        {/* NAVBAR */}
        <nav className="bg-white p-2 flex justify-between">
          <a href="" className="font-bold text-gray-700 text-2xl">
            {" "}
            OpenTable{" "}
          </a>
          <div>
            <div className="flex">
              <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">
                Sign in
              </button>
              <button className="border p-1 px-4 rounded">Sign up</button>
            </div>
          </div>
        </nav>
        {/* HEADER */}
        <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
          <div className="text-left text-lg py-3 m-auto flex justify-center">
            <input
              className="rounded  mr-3 p-2 w-[450px]"
              type="text"
              placeholder="State, city or town"
            />
            <button className="rounded bg-red-600 px-9 py-2 text-white">
              Let's go
            </button>
          </div>
        </div>
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          {/* SEARCH SIDE BAR */}
          <div className="w-1/5">
            <Sidebar />
          </div>
          {/* SEARCH SIDE BAR */}
          <div className="w-5/6">
            {/* RESAURANT CAR */}
            <RestaurantCard />
            {/* RESAURANT CAR */}
          </div>
        </div>
      </main>
    </main>
  );
}

export default Search;
