import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <div className="text-xl font-bold">header logo</div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search DuckDuckGo or type a URL"
          className="px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none"
        />
      </div>
    </header>
  );
}
