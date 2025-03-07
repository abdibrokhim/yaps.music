
import { useState, useEffect } from 'react';
import { Track } from '@/types/track';

// Sample tracks database with YouTube IDs
const sampleTracks: Track[] = [
  {
    id: '1',
    title: 'Lofi Study Session',
    artist: 'Lofi Girl',
    youtubeId: 'jfKfPfyJRdk',
    thumbnailUrl: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg',
    duration: 0, // Livestream
  },
  {
    id: '2',
    title: 'synthwave radio 🌌 beats to chill/game to',
    artist: 'Lofi Girl',
    youtubeId: '4xDzrJKXOOY',
    thumbnailUrl: 'https://i.ytimg.com/vi/4xDzrJKXOOY/hqdefault.jpg',
    duration: 0, // Livestream
  },
  {
    id: '3',
    title: 'Peaceful Lofi Coffee in 90\'s Tokyo Street 🌆 Rainy Lofi Hip Hop Mix 🌧️ Lofi Beats To Study/ Chill',
    artist: 'Lofi on the Rooftop',
    youtubeId: '4Q9jq-tdOoE',
    thumbnailUrl: 'https://i.ytimg.com/vi/4Q9jq-tdOoE/hqdefault.jpg',
    duration: 0, // Livestream
  },
];

export const useRandomTrack = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);

  const getNextTrack = () => {
    setLoading(true);
    const track = sampleTracks[trackIndex];
    
    // Simulate loading
    setTimeout(() => {
      setCurrentTrack(track);
      setLoading(false);
      setTrackIndex((prevIndex) => (prevIndex + 1) % sampleTracks.length);
    }, 800);
  };

  useEffect(() => {
    getNextTrack();
  }, []);

  return { currentTrack, loading, getNextTrack };
};
