import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-30 bg-black/60 backdrop-blur-md shadow-lg border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent drop-shadow">
            Podcast Summarizer
          </span>
        </Link>
        <button className="rounded-full p-2 bg-gray-800 hover:bg-gray-700 transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 19.5a7.5 7.5 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
