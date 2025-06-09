import { Maximize, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { useMusicStore } from '../store/musicStore';
import FilledPlayButton from './FilledPlayButton';

interface PlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  musicUrl: string;
  onNext: () => void;
  onPrev: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}


function PlayerControls({ isPlaying, onTogglePlay, musicUrl, onNext, onPrev, containerRef }: PlayerControlsProps) {
  const playerRef = useRef<any>(null);
  const setProgress = useMusicStore((state) => state.setProgress);
  const setDuration = useMusicStore((state) => state.setDuration);
  const setPlayerRef = useMusicStore((state) => state.setPlayerRef);
  const isRepeat = useMusicStore((state) => state.isRepeat);
  const toggleRepeat = useMusicStore((state) => state.toggleRepeat);
  const volume = useMusicStore((state) => state.volume);
  const setVolume = useMusicStore((state) => state.setVolume);
  const isShuffle = useMusicStore((state) => state.isShuffle);
  const toggleShuffle = useMusicStore((state) => state.toggleShuffle);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const doc = document as any;

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.(); // tela cheia do site todo
    } else {
      doc.exitFullscreen?.();
    }
  };



  const handleReady = (event: { target: any }) => {
    const player = event.target;
    playerRef.current = player;
    setPlayerRef(player);
    setDuration(player.getDuration());
    player.setVolume(volume); // opcional se estiver usando controle de volume
  };


  useEffect(() => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.playVideo();
    } else {
      playerRef.current.pauseVideo();
    }
  }, [isPlaying, playerRef]);


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
    const player = playerRef.current;

    if (!player || typeof player.playVideo !== 'function') {
      console.warn("YouTube player is not ready yet");
      return;
    }

    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }

    onTogglePlay();
  };


  const videoId = extractYouTubeId(musicUrl);

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 z-4 gap-6 text-[#B3B3B3]">
        <Shuffle
          onClick={toggleShuffle}
          className={`w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-[#EB4848] ${isShuffle ? "text-[#EB4848]" : ""
            }`}
        />

        <SkipBack onClick={onPrev} className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-[#EB4848]" />
        <FilledPlayButton
          isPlaying={isPlaying}
          onToggle={handleToggle}
          disabled={!playerRef.current}
        />
        <SkipForward onClick={onNext} className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-[#EB4848]" />
        <Repeat
          onClick={toggleRepeat}
          className={`w-6 h-6 lg:w-8 lg:h-8 cursor-pointer ${isRepeat ? 'text-[#EB4848]' : 'text-[#B3B3B3]'} hover:text-[#EB4848]`}
        />

      </div>


      {videoId && (
        <div style={{ width: 0, height: 0, overflow: 'hidden' }}>
          <YouTube
            videoId={videoId}
            opts={{ playerVars: { autoplay: isPlaying ? 1 : 0 } }}
            onReady={handleReady}
            onEnd={() => {
              if (isRepeat && playerRef.current) {
                playerRef.current.seekTo(0);
                playerRef.current.playVideo();
              } else {
                onNext();
              }
            }}
          />

        </div>
      )}

      <div
        className="md:flex items-center justify-between px-6 hidden gap-2 py-4 z-4 text-[#B3B3B3]"
      >

        <div className="group flex items-center gap-2 transition-all duration-500 ease-in-out">
          <Volume2 className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer" />

          <div
            className="transition-all duration-700 ease-in-out transform scale-95 opacity-0 max-w-0 overflow-hidden group-hover:scale-100 group-hover:opacity-100 group-hover:max-w-[160px]"
          >
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 md:w-32 mr-2"
            />
          </div>
        </div>

        <Maximize
          onClick={toggleFullscreen}
          className={`w-6 h-6 lg:w-8 lg:h-8 cursor-pointer hover:text-[#EB4848] ${isFullscreen ? 'opacity-100' : 'opacity-50'}`}
        />

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
