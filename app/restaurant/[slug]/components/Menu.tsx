import MenuCard from "./MenuCard";
import { Item } from "@prisma/client";

export default function Menu({ menu }: { menu: Item[] }) {
  return (
    <div className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {/* MENU CARD */}
          {menu.map((item) => (
            <MenuCard item={item} key={item.id} />
          ))}

          {/* MENU CARD */}
        </div>
      </div>
    </div>
  );
}
