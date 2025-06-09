import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useEffect, useRef } from 'react';
import PlayerControls from "../components/PlayerControls";
import ProgressBar from "../components/ProgressBar";
import { useMusicStore } from "../store/musicStore";

function Home() {
  const {
    musics,
    currentIndex,
    isPlaying,
    loadFromStorage,
    setCurrentIndex,
    setIsPlaying,
    setProgress,
  } = useMusicStore();

  const currentMusic = musics[currentIndex];
  const isShuffle = useMusicStore((state) => state.isShuffle);
  const toggleFavorite = useMusicStore((s) => s.toggleFavorite);
  const isFavorite = useMusicStore((s) => s.isFavorite);
  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    loadFromStorage();
  }, []);

  const progress = useMusicStore((state) => state.progress);
  const duration = useMusicStore((state) => state.duration);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(1, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    loadFromStorage();

    return () => {
      const player = useMusicStore.getState().playerRef;

      // ✅ Verifica se player e métodos existem antes de chamar
      if (player && typeof player.pauseVideo === 'function') {
        try {
          player.pauseVideo();
          player.seekTo(0);
        } catch (e) {
          console.warn("Player not ready to pause/reset", e);
        }
      }

      useMusicStore.getState().setIsPlaying(false);
      useMusicStore.getState().setProgress(0);
    };
  }, []);



  const handleNext = () => {
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * musics.length);
      setCurrentIndex(randomIndex);
    } else {
      setCurrentIndex((currentIndex + 1) % musics.length);
    }
    setProgress(0);
    setIsPlaying(true);
  };


  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + musics.length) % musics.length);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <>
      <main className="w-full flex flex-1 line-he relative pl-[32px] items-center justify-center">
        <div className="z-2 max-w-[1430px] w-full lg:pl-[32px]">
          <div className="mt-0 md:mt-[160px]">
            <h1 className="text-5xl font-extrabold leading-10">
              LEAGUE<span className="text-[30px] align-bottom">OF</span>
              <br />
              LEGENDS
            </h1>

            <p className="mt-6 font-lexend font-medium text-[24px] mb-6 leading-[100%] tracking-[0%]">
              Riot Games
            </p>

            <div className="flex items-center justify-start gap-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black"
              >
                <ChevronLeft color="#131313" size={20} />
              </button>

              <p className="font-lexend font-medium text-[24px] leading-[100%] tracking-[0%] align-middle text-white">
                {musics.length > 0 ? `${currentIndex + 1}/${musics.length}` : "0/0"}
              </p>

              <button
                onClick={handleNext}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black"
              >
                <ChevronRight color="#131313" size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-t from-[#131313] z-1 to-transparent absolute left-0 bottom-0 h-100 w-full"></div>
      </main>

      <ProgressBar />

      <footer className="bg-[#131313] w-full py-6 pb-6 px-6 flex flex-col lg:flex-row items-center justify-center gap-6">
        <div className="flex max-w-[1430px] justify-between w-full flex-col lg:flex-row">
          <div className="flex items-center gap-8">
            <Heart
              onClick={() => currentMusic?.id && toggleFavorite(currentMusic.id)}
              className={`w-8 h-8 hidden lg:block cursor-pointer transition-colors ${currentMusic?.id && isFavorite(currentMusic.id)
                ? "text-red-500"
                : "text-[#B3B3B3]"
                } hover:text-red-400`}
            />

            <div className="flex flex-col justify-center">
              <h2 className="font-lexend font-semibold text-[20px] lg:text-[24px] mb-[7px] leading-[100%] tracking-[0%]">
                {currentMusic?.title || "Nenhuma música"}
              </h2>

              <p className="font-lexend font-normal text-[16px] lg:text-[18px] leading-[100%] tracking-[0%] uppercase">
                {currentMusic?.artist || "Artista Desconhecido"} - {`${formatTime(progress)} / ${formatTime(duration)}`}
              </p>
            </div>
          </div>
          <PlayerControls
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            musicUrl={currentMusic?.youtubeUrl || ""}
            onNext={handleNext}
            onPrev={handlePrev}
            containerRef={containerRef}
          />


        </div>
      </footer>
    </>
  );
}

export default Home;