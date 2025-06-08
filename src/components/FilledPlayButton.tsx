import { Pause, Play } from 'lucide-react';

interface FilledPlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  disabled?: boolean; // ✅ prop opcional
}

function FilledPlayButton({ isPlaying, onToggle, disabled = false }: FilledPlayButtonProps) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`w-10 h-10 flex items-center justify-center rounded-full bg-[#1e1e1e] ${disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
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
