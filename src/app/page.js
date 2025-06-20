'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPodcasts() {
      try {
        const response = await axios.get('/api/podcasts');
        setPodcasts(response.data);
      } catch (err) {
        setError('Failed to fetch podcasts. Please try again later.');
      }
    }
    fetchPodcasts();
  }, []);

  useEffect(() => {
    if (selectedPodcast) {
      async function fetchEpisodes() {
        try {
          const response = await axios.get(`/api/podcasts/${selectedPodcast.id}/episodes`);
          setEpisodes(response.data);
        } catch (err) {
          setError('Failed to fetch episodes. Please try again later.');
        }
      }
      fetchEpisodes();
    }
  }, [selectedPodcast]);

  useEffect(() => {
    if (selectedEpisode) {
      async function checkSummary() {
        try {
          const response = await axios.get(`/api/summaries/${selectedEpisode.id}`);
          setSummary(response.data.summary);
        } catch (err) {
          setSummary('');
        }
      }
      checkSummary();
    }
  }, [selectedEpisode]);

  const handleSummarize = async () => {
    if (!selectedEpisode) return;
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`/api/summaries/${selectedEpisode.id}`);
      setSummary(response.data.summary);
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Podcast Summarizer</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Available Podcasts</h2>
            <div className="space-y-4 max-h-[80vh] overflow-y-auto">
              {podcasts.length === 0 && !error && (
                <p className="text-gray-500">Loading podcasts...</p>
              )}
              {podcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  className={`cursor-pointer transition-all p-4 border rounded-lg shadow-sm bg-white hover:shadow-md ${
                    selectedPodcast?.id === podcast.id ? 'border-blue-500 border-2' : ''
                  }`}
                  onClick={() => setSelectedPodcast(podcast)}
                >
                  <h3 className="text-lg font-medium">{podcast.title}</h3>
                  <img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-full h-48 object-cover rounded-md my-2"
                  />
                  <p className="text-sm text-gray-600">{podcast.publisher}</p>
                  <p className="text-sm text-gray-700 truncate">{podcast.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            {selectedPodcast ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Episodes of {selectedPodcast.title}</h2>
                <div className="space-y-4 max-h-[80vh] overflow-y-auto">
                  {episodes.length === 0 && !error && (
                    <p className="text-gray-500">Loading episodes...</p>
                  )}
                  {episodes.map((episode) => (
                    <div
                      key={episode.id}
                      className={`cursor-pointer transition-all p-4 border rounded-lg shadow-sm bg-white hover:shadow-md ${
                        selectedEpisode?.id === episode.id ? 'border-blue-500 border-2' : ''
                      }`}
                      onClick={() => setSelectedEpisode(episode)}
                    >
                      <h3 className="text-lg font-medium">{episode.title}</h3>
                      <p className="text-sm text-gray-700 truncate">{episode.description}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center mt-10">
                Select a podcast to view its episodes.
              </p>
            )}
          </div>

          <div>
            {selectedEpisode ? (
              <>
                <h2 className="text-xl font-semibold mb-4">{selectedEpisode.title}</h2>
                <button
                  onClick={handleSummarize}
                  disabled={loading}
                  className={`w-full mb-4 px-4 py-2 text-white rounded-lg transition-colors ${
                    loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    'Summarize'
                  )}
                </button>
                {summary ? (
                  <div className="p-4 border rounded-lg bg-white shadow">
                    <h3 className="text-lg font-medium mb-2">Summary</h3>
                    <p className="text-gray-800">{summary}</p>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    {loading ? 'Generating summary...' : 'No summary available yet.'}
                  </p>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-center mt-10">
                Select an episode to view or generate a summary.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}