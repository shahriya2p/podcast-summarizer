import React from "react";
import PropTypes from 'prop-types';

export default function PodcastHero({ podcast }) {
  if (!podcast) return null;
  return (
    <div className="container mx-auto px-4 pt-10 pb-6 flex flex-col md:flex-row items-center gap-8">
      <img
        src={podcast.image || podcast.thumbnail}
        alt={podcast.title || "Podcast cover"}
        className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-xl shadow-lg border-4 border-gray-800"
      />
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">{podcast.title}</h1>
        <p className="text-lg text-gray-300 mb-2">{podcast.publisher}</p>
        <p className="text-gray-400 mb-4 max-w-2xl">{podcast.description}</p>
        <div className="flex flex-wrap gap-2">
          {podcast.website && (
            <a href={podcast.website} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm font-medium transition">Website</a>
          )}
          {podcast.extra?.spotify_url && (
            <a href={podcast.extra.spotify_url} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm font-medium transition">Spotify</a>
          )}
          {podcast.extra?.youtube_url && (
            <a href={podcast.extra.youtube_url} target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm font-medium transition">YouTube</a>
          )}
        </div>
      </div>
    </div>
  );
}

PodcastHero.propTypes = {
  podcast: PropTypes.shape({
    title: PropTypes.string.isRequired,
    publisher: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    thumbnail: PropTypes.string,
    website: PropTypes.string,
    extra: PropTypes.object,
  }),
}; 