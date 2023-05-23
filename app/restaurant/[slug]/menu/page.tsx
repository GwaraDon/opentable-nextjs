import Menu from "../components/Menu";
import RestaurantNav from "../components/RestaurantNav";
import { Item, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const fetchItems = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
  return restaurant;
};
export default async function RestaurantMenu({
  params,
}: {
  params: { slug: string };
}) {
  const menu = await fetchItems(params.slug);
  // console.log(menu);
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      {/* RESAURANT NAVBAR */}
      <RestaurantNav slug={params.slug} />
      {/* RESAURANT NAVBAR */}
      {/* MENU */}
      <Menu menu={menu.items} />
      {/* MENU */}
    </div>
  );
}
