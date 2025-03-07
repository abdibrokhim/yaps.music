import { CSSProperties } from "react";
import { Play, Pause, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

interface PlayerControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  nextTrack: () => void;
  volume: number;
  setVolume: (volume: number) => void;
  muted: boolean;
  toggleMute: () => void;
}

const PlayerControls = ({
  isPlaying,
  togglePlay,
  nextTrack,
  volume,
  setVolume,
  muted,
  toggleMute,
}: PlayerControlsProps) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={nextTrack}
          className="transition-all duration-300 border-zinc-600 hover:bg-zinc-100 dark:border-zinc-400 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-300 cursor-pointer"
          aria-label="Skip to next track"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="transition-all duration-300 text-zinc-800 dark:text-zinc-300 cursor-pointer"
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted || volume === 0 ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </Button>

        <Slider
          defaultValue={[volume * 100]}
          onValueChange={(value) => setVolume(value[0] / 100)}
          max={100}
          step={1}
          className="w-24"
          aria-label="Volume"
        />
      </div>
    </div>
  );
};

export default PlayerControls;
