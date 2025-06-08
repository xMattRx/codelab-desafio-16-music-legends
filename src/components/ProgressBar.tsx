import { useCallback, useEffect, useRef, useState } from "react";
import { useMusicStore } from "../store/musicStore";

function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const progress = useMusicStore((state) => state.progress);
  const duration = useMusicStore((state) => state.duration);
  const setProgress = useMusicStore((state) => state.setProgress);
  const playerRef = useMusicStore((state) => state.playerRef);

  const calculateProgress = useCallback(
    (clientX: number) => {
      if (!barRef.current || duration === 0) return;
      const { left, width } = barRef.current.getBoundingClientRect();
      const newProgressPercent = ((clientX - left) / width) * 100;
      const clamped = Math.max(0, Math.min(100, newProgressPercent));
      const newTime = (clamped / 100) * duration;
      if (playerRef?.seekTo) {
        playerRef.seekTo(newTime, true);
      }
      setProgress(newTime);
    },
    [duration, setProgress, playerRef]
  );

  const handleStartDrag = useCallback(
    (clientX: number) => {
      setIsDragging(true);
      calculateProgress(clientX);
    },
    [calculateProgress]
  );

  const handleMouseDown = (e: React.MouseEvent) => handleStartDrag(e.clientX);
  const handleTouchStart = (e: React.TouchEvent) => handleStartDrag(e.touches[0].clientX);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => isDragging && calculateProgress(e.clientX);
    const handleTouchMove = (e: TouchEvent) => isDragging && calculateProgress(e.touches[0].clientX);
    const stopDragging = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", stopDragging);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", stopDragging);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging, calculateProgress]);

  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <div
      ref={barRef}
      className="relative w-full h-1 z-2 bg-[#292929] rounded-full cursor-pointer touch-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progressPercent)}
      aria-label="Progress"
    >
      <div
        className="h-1 bg-white rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ width: `${progressPercent}%` }}
      />

      <div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#EB4848] rounded-full shadow-[0_0_10px_2px_#EB4848] transition-[left] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none"
        style={{ left: `calc(${progressPercent}% - 6px)` }}
      />


    </div>
  );
}

export default ProgressBar;
