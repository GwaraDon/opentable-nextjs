import React from "react";
import Navbar from "../../components/Navbar";
import Header from "./components/Header";

export default function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  return (
    <>
      {/* NAVBAR */}
      <Navbar></Navbar>
      {/* NAVBAR */}
      <Header name={params.slug} />
      {/* HEADER */}
      {/* DESCRIPTION PORTION */}
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </>
  );
}
