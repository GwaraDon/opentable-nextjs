import { Cuisine, Location } from ".prisma/client";
import { PRICE } from "@prisma/client";
import Link from "next/link";
import { SearchParams } from "../page";

export default function Sidebar({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: SearchParams;
}) {
  return (
    <div>
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {locations.map((location, index) => {
          return (
            <Link
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  location: location.name,
                },
              }}
              className="font-light text-reg capitalize block"
              key={index}
            >
              {location.name}
            </Link>
          );
        })}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine, index) => {
          return (
            <Link
              href={{
                pathname: "/search",
                query: {
                  ...searchParams,
                  cuisine: cuisine.name,
                },
              }}
              className="font-light text-reg capitalize block"
              key={index}
            >
              {cuisine.name}
            </Link>
          );
        })}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price: PRICE.CHEAP,
              },
            }}
            className="border w-full text-reg font-light rounded-l p-2"
          >
            $
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price: PRICE.REGULAR,
              },
            }}
            className="border-r border-t border-b w-full text-reg font-light p-2"
          >
            $$
          </Link>
          <Link
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                price: PRICE.EXPENSIVE,
              },
            }}
            className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
          >
            $$$
          </Link>
        </div>
      </div>
    </div>
  );
}
