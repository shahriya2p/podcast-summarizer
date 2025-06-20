"use client";

import { useParams, useRouter } from "next/navigation";
import PodcastHero from "../../components/PodcastHero";
import EpisodeCard from "../../components/EpisodeCard";
import EpisodeModal from "../../components/EpisodeModal";
import usePodcastDetails from '../../hooks/usePodcastDetails';
import useEpisodeSummary from '../../hooks/useEpisodeSummary';
import Loader from "../../components/Loader";

export default function PodcastDetailsPage() {
  const { id } = useParams();
  const {
    podcastData,
    isPodcastLoading,
    podcastError,
  } = usePodcastDetails(id);
  const {
    selectedEpisode,
    setSelectedEpisode,
    summary,
    summaryLoading,
    summaryError,
    summarizing,
    handleSummarize,
    resetSummaryState,
  } = useEpisodeSummary();

  if (isPodcastLoading) {
    return <Loader message="Loading podcast details..." />;
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
          onClose={() => { setSelectedEpisode(null); resetSummaryState(); }}
          onSummarize={() => handleSummarize(selectedEpisode)}
        />
      )}
    </div>
  );
}