import { Inter } from "@next/font/google";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import RestaurantCard from "./components/RestaurantCard";
import { PrismaClient, Cuisine, Location, PRICE, Review } from "@prisma/client";
const inter = Inter({ subsets: ["latin"] });
export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  slug: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  reviews: Review[];
}
const prisma = new PrismaClient();
// const fetchRestaurantReviews = async () => {
//   return prisma.review.findMany();
// };
const fetchRestaurants = async () => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      reviews: true,
    },
  });
  return restaurants;
};
export default async function Home() {
  const restaurants = await fetchRestaurants();
  // const reviews = await fetchRestaurantReviews();
  // console.log(reviews);
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        {/* NAVBAR */}
        <Navbar></Navbar>
        {/* NAVBAR */}
        <main>
          {/* HEADER */}
          <Header />
          {/* HEADER */} {/* CARDS */}
          <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
            {restaurants.map((restaurant) => (
              <RestaurantCard restaurant={restaurant} key={restaurant.id} />
            ))}
          </div>
          {/* CARDS */}
        </main>
      </main>
    </main>
  );
}
