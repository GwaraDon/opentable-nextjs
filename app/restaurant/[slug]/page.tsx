import RestaurantNav from "./components/RestaurantNav";
import { PrismaClient, Review } from "@prisma/client";
import Image from "next/image";
import { avgRating } from "../../../utils/calculateAverageRating";
import Stars from "../../components/Stars";
import { notFound } from "next/navigation";
interface Restaurant {
  id: number;
  name: string;
  slug: string;
  description: string;
  main_image: string;
  images: string[];
  reviews: Review[];
}
const prisma = new PrismaClient();
const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      main_image: true,
      reviews: true,
    },
  });
  if (!restaurant) {
    // throw new Error("Restaurant not found");
    notFound();
  }
  return restaurant;
};
export default async function RestuarantDetail({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  // console.log({ props });
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        {/* RESAURANT NAVBAR */}
        <RestaurantNav slug={restaurant.slug} />
        {/* RESAURANT NAVBAR */} {/* TITLE */}
        <div className="mt-4 border-b pb-6">
          <h1 className="font-bold text-6xl">{restaurant?.name}</h1>
        </div>
        {/* TITLE */} {/* RATING */}
        <div className="flex items-end">
          <div className="ratings mt-2 flex items-center">
            <Stars reviews={restaurant.reviews} />
            <p className="text-reg ml-3">
              {avgRating(restaurant.reviews).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-reg ml-4">{restaurant.reviews.length} Reviews</p>
          </div>
        </div>
        {/* RATING */} {/* DESCRIPTION */}
        <div className="mt-4">
          <p className="text-lg font-light">{restaurant?.description}</p>
        </div>
        {/* DESCRIPTION */} {/* IMAGES */}
        <div>
          <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
            {restaurant?.images.length}
            {restaurant?.images.length > 1 ? " photos" : " photo"}
          </h1>
          <div className="flex flex-wrap">
            {restaurant?.images.map((image) => (
              <div className="images m-2">
                <img src={image} width={200} height={200} alt="image" />
              </div>
            ))}
          </div>
        </div>
        {/* IMAGES */} {/* REVIEWS */}
        <div>
          <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
            What {restaurant.reviews.length} people are saying
          </h1>
          <div>
            {/* REVIEW CARD */}
            {restaurant.reviews.map((review) => (
              <div className="border-b pb-7 mb-7" key={review.id}>
                <div className="flex">
                  <div className="w-1/6 flex flex-col items-center">
                    <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
                      <h2 className="text-white text-2xl">
                        {review.first_name[0]} {review.last_name[0]}
                      </h2>
                    </div>
                    <p className="text-center">
                      {review.first_name} {review.last_name}
                    </p>
                  </div>
                  <div className="ml-10 w-5/6">
                    <div className="flex items-center">
                      <div className="flex mr-5">
                        <Stars reviews={restaurant.reviews} />
                        {avgRating(restaurant.reviews).toFixed(2)}
                      </div>
                    </div>
                    <div className="mt-5">
                      <p className="text-lg font-light">{review.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* REVIEW CARD */}
          </div>
        </div>
        {/* REVIEWS */}
      </div>
      <div className="w-[27%] relative text-reg">
        <div className="fixed w-[15%] bg-white rounded p-3 shadow">
          <div className="text-center border-b pb-2 font-bold">
            <h4 className="mr-7 text-lg">Make a Reservation</h4>
          </div>
          <div className="my-3 flex flex-col">
            <label htmlFor="">Party size</label>
            <select name="" className="py-3 border-b font-light" id="">
              <option value="">1 person</option>
              <option value="">2 people</option>
            </select>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-[48%]">
              <label htmlFor="">Date</label>
              <input type="text" className="py-3 border-b font-light w-28" />
            </div>
            <div className="flex flex-col w-[48%]">
              <label htmlFor="">Time</label>
              <select name="" id="" className="py-3 border-b font-light">
                <option value="">7:30 AM</option>
                <option value="">9:30 AM</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
              Find a Time
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
