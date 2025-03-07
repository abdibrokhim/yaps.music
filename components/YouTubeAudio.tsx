
import { useEffect, useRef, useState } from 'react';
import { Track } from '@/types/track';

interface YouTubeAudioProps {
  track: Track | null;
  isPlaying: boolean;
  volume: number;
  onReady: () => void;
}

// Extend Window interface to include the YouTube API callback
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

const YouTubeAudio = ({ track, isPlaying, volume, onReady }: YouTubeAudioProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    // YouTube IFrame API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // Define YT player ready callback
    window.onYouTubeIframeAPIReady = () => {
      setPlayerReady(true);
    };

    return () => {
      window.onYouTubeIframeAPIReady = () => {};
    };
  }, []);

  // Control player based on isPlaying prop
  useEffect(() => {
    if (!track || !playerReady || !iframeRef.current?.contentWindow) return;

    const message = isPlaying 
      ? JSON.stringify({ event: 'command', func: 'playVideo' })
      : JSON.stringify({ event: 'command', func: 'pauseVideo' });
    
    iframeRef.current.contentWindow.postMessage(message, '*');
  }, [isPlaying, track, playerReady]);

  // Control volume
  useEffect(() => {
    if (!track || !playerReady || !iframeRef.current?.contentWindow) return;

    const message = JSON.stringify({ 
      event: 'command', 
      func: 'setVolume', 
      args: [volume * 100] 
    });
    
    iframeRef.current.contentWindow.postMessage(message, '*');
  }, [volume, track, playerReady]);

  // Handle track changes
  useEffect(() => {
    if (track) {
      onReady();
    }
  }, [track, onReady]);

  if (!track) return null;

  return (
    <div className="absolute opacity-0 pointer-events-none">
      <iframe
        ref={iframeRef}
        id="youtube-player"
        width="1"
        height="1"
        src={`https://www.youtube.com/embed/${track.youtubeId}?enablejsapi=1&autoplay=1&controls=0&modestbranding=1&origin=${window.location.origin}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="YouTube Audio Player"
      />
    </div>
  );
};

export default YouTubeAudio;
