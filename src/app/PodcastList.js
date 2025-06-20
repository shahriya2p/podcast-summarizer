"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import usePodcastList from './hooks/usePodcastList';
import Loader from './components/Loader';

// PodcastList displays a grid of podcasts as clickable cards. Selecting a podcast navigates to its details page.
function PodcastList(props) {
  const { podcasts, loading } = usePodcastList();
  const router = useRouter();

  if (loading) {
    return <Loader message="Loading podcasts..." />;
  }

  return (
    <div className="relative">
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')]" />
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6 z-10">
        {podcasts.map((podcast) => {
          const listenScore = podcast.listen_score || podcast.podcast?.listen_score;
          const title = podcast.title_original || podcast.podcast?.title_original || podcast.title;
          const publisher = podcast.publisher_original || podcast.podcast?.publisher_original || podcast.publisher;
          return (
            <div
              key={podcast.id}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200 border border-gray-700 hover:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 outline-none"
              onClick={() => router.push(`/podcasts/${podcast.id}`)}
              tabIndex={0}
              role="button"
            >
              <img
                src={podcast.image || podcast.thumbnail || podcast.podcast?.image || podcast.podcast?.thumbnail}
                alt={title || 'Podcast cover'}
                className="w-32 h-32 object-cover rounded-lg mt-6 mb-4 border-4 border-gray-900 shadow-md"
              />
              <div className="px-4 pb-6 w-full flex-1 flex flex-col justify-between">
                <h2 className="text-xl font-bold mb-1 text-center text-white hover:text-blue-400 transition-colors line-clamp-2">{title}</h2>
                <p className="text-sm text-gray-400 mb-2 text-center">{publisher}</p>
                {listenScore !== undefined && (
                  <p className="text-xs text-blue-400 mb-2 text-center">Listen Score: {listenScore}</p>
                )}
                <p className="text-gray-300 text-center text-sm line-clamp-3 mb-2">{podcast.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

PodcastList.propTypes = {};

export default PodcastList; 