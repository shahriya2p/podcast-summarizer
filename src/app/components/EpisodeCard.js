import React from "react";

export default function EpisodeCard({ episode, onClick }) {
  return (
    <div
      className="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={onClick}
    >
      <img
        src={episode.image || episode.thumbnail}
        alt={episode.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2">{episode.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-3 mb-2" dangerouslySetInnerHTML={{ __html: episode.description }} />
        <span className="text-xs text-gray-500">{new Date(episode.pub_date_ms).toLocaleDateString()}</span>
      </div>
    </div>
  );
} 