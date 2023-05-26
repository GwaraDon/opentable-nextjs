import { Cuisine, PRICE, PrismaClient, Location } from "@prisma/client";
import React from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import RestaurantCard from "./components/RestaurantCard";
import Sidebar from "./components/Sidebar";
const prisma = new PrismaClient();
export interface SearchParams {
  location: String;
  cuisine: String;
  price: PRICE;
}
const fetchRestaurantByLocation = (searchParams: SearchParams) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true,
  };
  const where: any = {};

  if (searchParams.location) {
    const location = {
      name: {
        equals: searchParams.location.toLowerCase(),
      },
    };
    where.location = location;
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };
    where.cuisine = cuisine;
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };
    where.price = price;
  }
  return prisma.restaurant.findMany({
    where,
    select,
  });
};
const fetchLocation = async () => {
  return await prisma.location.findMany();
};
const fetchCuisine = async () => {
  return await prisma.cuisine.findMany();
};
// const fetchPrice = async () => {
//   return await prisma.PRICE.findMany();
// };
async function Search({ searchParams }: { searchParams: SearchParams }) {
  const restaurants = await fetchRestaurantByLocation(searchParams);
  const location = await fetchLocation();
  const cuisine = await fetchCuisine();
  // const prices = await fetchPrice();

  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        {/* NAVBAR */}
        <Navbar />
        {/* HEADER */}
        <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2 py-10">
          <SearchBar></SearchBar>
        </div>
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          {/* SEARCH SIDE BAR */}
          <div className="w-1/5">
            <Sidebar
              locations={location}
              cuisines={cuisine}
              searchParams={searchParams}
            ></Sidebar>
          </div>
          {/* SEARCH SIDE BAR */}
          <div className="w-5/6">
            {/* RESAURANT CAR */}
            {restaurants?.length ? (
              restaurants.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
              ))
            ) : (
              <p>No restaurant found</p>
            )}

            {/* RESAURANT CAR */}
          </div>
        </div>
      </main>
    </main>
  );
}

export default Search;
