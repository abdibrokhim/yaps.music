import { useState, useEffect, useMemo } from "react";
import { useRandomTrack } from "@/hooks/useRandomTrack";
import YouTubeAudio from "./YouTubeAudio";
import PlayerControls from "./PlayerControls";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton"
import AudioVisualizer from "./AudioVisualizer";

const MusicPlayer = () => {
  const { currentTrack, loading, getNextTrack } = useRandomTrack();
  const [isPlaying, setIsPlaying] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.7);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);

  const togglePlay = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setIsPlaying(false);
    setReady(false);
    getNextTrack();
  };

  const toggleMute = () => {
    if (muted) {
      // Unmute - restore previous volume
      setVolume(previousVolume);
      setMuted(false);
    } else {
      // Mute - save current volume first
      setPreviousVolume(volume);
      setVolume(0);
      setMuted(true);
    }
  };
  
  // Handle volume changes from slider
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (newVolume === 0) {
      setMuted(true);
    } else if (muted) {
      setMuted(false);
    }
  };

  const handleAudioReady = () => {
    setReady(true);
    setIsPlaying(true);
  };

  // Generate random wave heights for a more realistic visualization
  const waveHeights = useMemo(() => {
    // Create more bars for a richer visualization
    return Array.from({ length: 24 }, () => ({
      height: Math.random() * 0.5 + 0.2,
      delay: Math.random() * 0.5,
      speed: 0.8 + Math.random() * 1.2
    }));
  }, [currentTrack]);

  // Simulate audio intensity changes
  const [intensity, setIntensity] = useState(0.5);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    // Simulate changing audio intensity
    const intensityInterval = setInterval(() => {
      setIntensity(Math.random() * 0.6 + 0.4);
    }, 800);
    
    return () => clearInterval(intensityInterval);
  }, [isPlaying]);

  useEffect(() => {
    if (currentTrack && ready) {
      toast(
        "Now Playing", {
          description: `${currentTrack.title} by ${currentTrack.artist}`,
          action: {
            label: "Yaps!",
            onClick: () => console.log("dismiss"),
          },
          duration: 2000,
        },
      );
    }
  }, [currentTrack, ready]);

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl p-0 max-w-md w-full mx-auto">
      <div className="flex flex-col items-center space-y-8">

        <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-sm">
          {loading ? (
            <Skeleton className="w-48 h-48 bg-zinc-100 dark:bg-zinc-900" />
          ) : (
            <img
              src={currentTrack?.thumbnailUrl || "https://placehold.co/400"}
              alt={currentTrack?.title || "Yaps Art"}
              className="w-full h-full object-cover animate-scale-in"
            />
          )}
        </div>

        <div className="text-center max-w-sm w-full">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="mx-auto h-4 w-[250px] bg-zinc-100 dark:bg-zinc-900 shadow-sm" />
              <Skeleton className="mx-auto h-4 w-[200px] bg-zinc-100 dark:bg-zinc-900 shadow-sm" />
            </div>
          ) : (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold tracking-tight truncate text-zinc-700 dark:text-zinc-200">
                {currentTrack?.title || "Yaps Track"}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                {currentTrack?.artist || "Yaps Artist"}
              </p>
            </div>
          )}
        </div>

        <PlayerControls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          nextTrack={nextTrack}
          volume={volume}
          setVolume={handleVolumeChange}
          muted={muted}
          toggleMute={toggleMute}
        />
      </div>

      <YouTubeAudio
        track={currentTrack}
        isPlaying={isPlaying}
        volume={volume}
        onReady={handleAudioReady}
      />
    </div>
  );
};

export default MusicPlayer;

