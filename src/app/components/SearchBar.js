import React from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ value, onChange, onFilter }) {
  return (
    <form
      className="w-full max-w-2xl flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-2 mb-8 md:mb-10 bg-black/50 backdrop-blur rounded-xl shadow-lg px-3 md:px-4 py-2 md:py-3 mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <span className="text-gray-400 flex items-center justify-center mb-2 md:mb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search podcasts, topics, or hosts..."
        className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-base md:text-lg px-2 py-2 md:py-0 w-full"
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="w-full md:w-auto flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition"
        onClick={onFilter}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
        <span className="hidden sm:inline">Filter</span>
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFilter: PropTypes.func,
};
