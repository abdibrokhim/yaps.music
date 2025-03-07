'use client'

import MusicPlayer from '@/components/MusicPlayer';

const Playground = () => {
  return (
    <div className="w-full sm:p-6 p-0 flex flex-col gap-8 items-center justify-center bg-white dark:bg-zinc-950">
        <MusicPlayer />
        <p className="text-xs text-zinc-300 dark:text-zinc-700">playing random tracks from youtube</p>
    </div>
  );
};

export default Playground;
