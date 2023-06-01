import React from "react";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="card rounded-none bg-slate-100 shadow-sm p-8 ">
        <h1 className="text-4xl font-bold text-red-600 pb-8">Page not found</h1>
        <p className="text-lg text-gray-600">Error code: 404</p>
      </div>
    </div>
  );
}
