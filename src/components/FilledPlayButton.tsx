import { Pause, Play } from 'lucide-react';

interface FilledPlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
}

function FilledPlayButton({ isPlaying, onToggle }: FilledPlayButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e1e1e]"
    >
      {isPlaying ? (
        <Pause className="w-5 h-5 lg:w-8 cursor-pointer lg:h-8 fill-[#EB4848]" />
      ) : (
        <Play className="w-5 h-5 lg:w-8 lg:h-8 cursor-pointer fill-[#EB4848]" />
      )}
    </button>
  );
}

export default FilledPlayButton;
