import { useState, useEffect } from 'react';
import axios from 'axios';

export default function usePodcastDetails(id) {
  const [podcastData, setPodcastData] = useState(null);
  const [isPodcastLoading, setIsPodcastLoading] = useState(true);
  const [podcastError, setPodcastError] = useState('');

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
          setPodcastError('Failed to fetch podcast details. Please try again later.');
          setIsPodcastLoading(false);
        }
      }
    }
    if (id) fetchPodcast();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { podcastData, isPodcastLoading, podcastError };
}
