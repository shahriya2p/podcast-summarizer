'use client';

import PodcastList from './PodcastList';
import SearchBar from './components/SearchBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto p-4 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center py-12 mb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center drop-shadow-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
            Podcast Summarizer
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6 text-center max-w-2xl">
            Discover, explore, and get AI-powered summaries of your favorite podcasts. Search,
            listen, and stay informed—faster than ever.
          </p>
        </section>
        <SearchBar />
        <PodcastList />
      </div>
    </div>
  );
}
