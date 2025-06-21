import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useEpisodeSummary() {
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState('');
  const [summarizing, setSummarizing] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!selectedEpisode) return;
    setSummary('');
    setSummaryError('');
    setSummaryLoading(true);
    axios
      .get(`/api/summaries/${selectedEpisode.id}`)
      .then((response) => {
        setSummary(response.data.summary);
        setSummaryLoading(false);
      })
      .catch(() => {
        setSummary('');
        setSummaryLoading(false);
      });
    return () => {
      setAnimate(false);
    };
  }, [selectedEpisode]);

  const handleSummarize = async (episode) => {
    if (!episode) return;
    setSummarizing(true);
    setSummaryError('');
    try {
      const response = await axios.post(`/api/summaries/${episode.id}`);
      setAnimate(true);
      setSummary(response.data.summary);
    } catch (err) {
      setSummaryError('Failed to generate summary. Please try again.');
    } finally {
      setSummarizing(false);
    }
  };

  const resetSummaryState = () => {
    setSummary('');
    setSummaryError('');
  };

  return {
    selectedEpisode,
    setSelectedEpisode,
    summary,
    summaryLoading,
    summaryError,
    summarizing,
    handleSummarize,
    resetSummaryState,
    animate,
  };
}
