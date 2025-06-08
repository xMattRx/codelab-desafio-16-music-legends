import { Maximize, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { useMusicStore } from '../store/musicStore';
import FilledPlayButton from './FilledPlayButton';

interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  musicUrl: string;
  onNext: () => void;
  onPrev: () => void;
}

function PlayerControls({ isPlaying, onTogglePlay, musicUrl, onNext, onPrev }: PlayerControlsProps) {
  const playerRef = useRef<any>(null);
  const setProgress = useMusicStore((state) => state.setProgress);
  const setDuration = useMusicStore((state) => state.setDuration);
  const setPlayerRef = useMusicStore((state) => state.setPlayerRef);

  const progress = useMusicStore((state) => state.progress);
  const duration = useMusicStore((state) => state.duration);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(1, '0')}:${String(secs).padStart(2, '0')}`;
  };


  const handleReady = (event: { target: any }) => {
    playerRef.current = event.target;
    setPlayerRef(event.target);
    const duration = event.target.getDuration();
    setDuration(duration);
    if (isPlaying) {
      event.target.playVideo();
    } else {
      event.target.pauseVideo();
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        const currentTime = playerRef.current?.getCurrentTime?.() || 0;
        setProgress(currentTime);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, setProgress]);

  const handleToggle = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }

    onTogglePlay();
  };

  const videoId = extractYouTubeId(musicUrl);

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 z-4 gap-6 text-[#B3B3B3]">
        <Shuffle className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-[#EB4848]" />
        <SkipBack onClick={onPrev} className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-[#EB4848]" />
        <FilledPlayButton isPlaying={isPlaying} onToggle={handleToggle} />
        <SkipForward onClick={onNext} className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-[#EB4848]" />
        <Repeat className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-[#EB4848]" />
      </div>
      

      {videoId && (
        <div style={{ width: 0, height: 0, overflow: 'hidden' }}>
          <YouTube
            videoId={videoId}
            opts={{
              playerVars: {
                autoplay: isPlaying ? 1 : 0,
              },
            }}
            onReady={handleReady}
            onEnd={onNext}
          />
        </div>
      )}

      <div className='md:flex items-center justify-between px-6 hidden py-4 z-4 gap-6 text-[#B3B3B3]'>
        <Volume2 className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-[#EB4848]" />
        <Maximize className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-[#EB4848]" />
      </div>
      
    </>
  );
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default PlayerControls;
