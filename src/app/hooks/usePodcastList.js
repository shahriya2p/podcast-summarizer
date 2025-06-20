import { useState, useEffect } from 'react';

export default function usePodcastList() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/podcasts')
      .then((res) => res.json())
      .then((data) => {
        setPodcasts(data.results);
        setLoading(false);
      });
  }, []);

  return { podcasts, loading };
} 