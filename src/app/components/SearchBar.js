import React from "react";

export default function SearchBar() {
  return (
    <form className="w-full max-w-2xl flex items-center gap-2 mb-10 bg-black/50 backdrop-blur rounded-xl shadow-lg px-4 py-3 mx-auto">
      <span className="text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search podcasts, topics, or hosts..."
        className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-lg px-2"
      />
      <button type="button" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
        Filter
      </button>
    </form>
  );
} 