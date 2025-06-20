"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import PodcastHero from "../../components/PodcastHero";
import EpisodeCard from "../../components/EpisodeCard";
import EpisodeModal from "../../components/EpisodeModal";

export default function PodcastDetailsPage() {
  const params = useParams();
  const { id } = params;
  const [podcastData, setPodcastData] = useState(null);
  const [isPodcastLoading, setIsPodcastLoading] = useState(true);
  const [podcastError, setPodcastError] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [summary, setSummary] = useState("");

  const [summarizing, setSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchPodcast() {
      try {
        const response = await axios.get(`/api/podcasts/${id}`);
        if (!cancelled) {
          setPodcastData(response.data);
          setIsPodcastLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setPodcastError("Failed to fetch podcast details. Please try again later.");
          setIsPodcastLoading(false);
        }
      }
    }
    if (id) fetchPodcast();
    return () => { cancelled = true; };
  }, [id]);

  // Fetch summary for selected episode
  useEffect(() => {
    if (!selectedEpisode) return;
    setSummary("");
    setSummaryError("");
    setSummaryLoading(true);
    axios
      .get(`/api/summaries/${selectedEpisode.id}`)
      .then((response) => {
        setSummary(response.data.summary);
        setSummaryLoading(false);
      })
      .catch(() => {
        setSummary("");
        setSummaryLoading(false);
      });
  }, [selectedEpisode]);

  const handleSummarize = async () => {
    if (!selectedEpisode) return;
    setSummarizing(true);
    setSummaryError("");
    try {
      const response = await axios.post(`/api/summaries/${selectedEpisode.id}`);
      setSummary(response.data.summary);
    } catch (err) {
      setSummaryError("Failed to generate summary. Please try again.");
    } finally {
      setSummarizing(false);
    }
  };

  if (isPodcastLoading) {
    return <div className="text-center py-10">Loading podcast details...</div>;
  }

  if (podcastError) {
    return <div className="text-center text-red-500 py-10">{podcastError}</div>;
  }

  if (!podcastData) {
    return <div className="text-center py-10">Podcast not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <PodcastHero podcast={podcastData} />
      {/* Episodes Grid */}
      <div className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6 mt-4">Episodes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {podcastData.episodes && podcastData.episodes.length > 0 ? (
            podcastData.episodes.map((ep) => (
              <EpisodeCard
                key={ep.id}
                episode={ep}
                onClick={() => setSelectedEpisode(ep)}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">No episodes found.</div>
          )}
        </div>
      </div>
      {/* Episode Modal */}
      {selectedEpisode && (
        <EpisodeModal
          episode={selectedEpisode}
          summary={summary}
          summaryLoading={summaryLoading}
          summaryError={summaryError}
          summarizing={summarizing}
          onClose={() => { setSelectedEpisode(null); setSummary(""); setSummaryError(""); }}
          onSummarize={handleSummarize}
        />
      )}
    </div>
  );
} 