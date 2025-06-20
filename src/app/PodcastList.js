"use client"

import React, { useEffect, useState } from 'react';

function PodcastList() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState({});
  const [summarizing, setSummarizing] = useState({});

  useEffect(() => {
    fetch('/api/podcast')
      .then((res) => res.json())
      .then((data) => {
        setPodcasts(data);
        setLoading(false);
      });
  }, []);

  const handleSummarize = async (podcast) => {
    setSummarizing((prev) => ({ ...prev, [podcast.id]: true }));
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ episodeId: podcast.id, description: podcast.description })
    });
    const data = await res.json();
    setSummaries((prev) => ({ ...prev, [podcast.id]: data.summary }));
    setSummarizing((prev) => ({ ...prev, [podcast.id]: false }));
  };

  if (loading) {
    return <div className="text-center py-8">Loading podcasts...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {podcasts.map((podcast) => (
        <div key={podcast.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <img src={podcast.thumbnail} alt={podcast.title} className="w-24 h-24 object-contain mb-4" />
          <h2 className="text-lg font-semibold mb-1 text-center">{podcast.title}</h2>
          <p className="text-sm text-gray-500 mb-2 text-center">{podcast.publisher}</p>
          <p className="text-gray-700 text-center mb-2">{podcast.description}</p>
          <button
            className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            onClick={() => handleSummarize(podcast)}
            disabled={summarizing[podcast.id]}
          >
            {summarizing[podcast.id] ? 'Summarizing...' : 'Summarize'}
          </button>
          {summaries[podcast.id] && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-800 w-full">
              <strong>Summary:</strong> {summaries[podcast.id]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PodcastList; 