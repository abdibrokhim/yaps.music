import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Wave {
  speed: number;
  delay: number;
  height: number;
}

interface AudioVisualizerProps {
  waveHeights: Wave[];
  isPlaying: boolean;
  intensity: number;
}

const AudioVisualizer = ({ waveHeights, isPlaying, intensity }: AudioVisualizerProps) => {
  return (
    <Card
      className={`bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg p-4 transition-all duration-300 ${
        isPlaying ? "ring-2 ring-white" : ""
      }`}
    >
      <CardContent>
        <div className="relative h-32 flex items-center justify-center">
          <div className={`flex space-x-2 ${isPlaying ? "opacity-100" : "opacity-50"}`}>
            {waveHeights.map((wave, index) => (
              <div
                key={index}
                className="w-2 bg-white rounded-full filter drop-shadow-md"
                style={{
                  height: `${wave.height * intensity * 100}%`,
                  animation: `waveAnimation ${wave.speed}s ease-in-out infinite`,
                  animationDelay: `${wave.delay}s`,
                  opacity: 0.7 - ((index % 5) * 0.05),
                } as React.CSSProperties}
              ></div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioVisualizer;
