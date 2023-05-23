import Link from "next/link";
import { RestaurantCardType } from "../page";

interface Props {
  restaurant: RestaurantCardType;
}
export default function RestaurantCard({ restaurant }: Props) {
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`restaurant/${restaurant.slug}`}>
        <img src={restaurant.main_image} alt="" className="w-full h-36" />
      </Link>
      <div className="p-1">
        <h3 className="font-bold text-2xl mb-2">
          <Link href={`restaurant/${restaurant.slug}`}>{restaurant.name}</Link>
        </h3>
        <div className="flex items-start">
          <div className="flex mb-2">*****</div>
          <p className="ml-2">
            <span className="mr-2 font-medium">
              {restaurant.reviews.length > 0 ? restaurant.reviews.length : "No"}
            </span>
            {restaurant.reviews.length > 1 ? "reviews" : "review"}
          </p>
        </div>
        <div className="flex text-reg font-light capitalize">
          <p className=" mr-3">{restaurant.cuisine.name}</p>
          <p className="mr-3">Rs.{restaurant.price}</p>
          <p>{restaurant.location.name}</p>
        </div>
        <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
      </div>
    </div>
  );
}
