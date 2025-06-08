import { create } from "zustand";

export interface Music {
  id: string;
  title: string;
  artist: string;
  youtubeUrl: string;
  coverUrl?: string;
  isFavorite?: boolean;
}

interface MusicStore {
  musics: Music[];
  currentIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  playerRef: any;
  isRepeat: boolean;
  isShuffle: boolean;
  volume: number;

  setMusics: (musics: Music[]) => void;
  loadFromStorage: () => void;
  setCurrentIndex: (index: number) => void;
  setIsPlaying: (value: boolean) => void;
  setProgress: (value: number) => void;
  setDuration: (value: number) => void;
  setPlayerRef: (ref: any) => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  playNext: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean; // ✅ novo
  setVolume: (value: number) => void;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
  musics: [],
  currentIndex: 0,
  isPlaying: false,
  progress: 0,
  duration: 0,
  playerRef: null,
  isRepeat: false,
  isShuffle: false,
  volume: 100,

  setMusics: (musics) => {
    set({ musics });
    localStorage.setItem("musics", JSON.stringify(musics));
  },

  loadFromStorage: () => {
    const stored = localStorage.getItem("musics");
    if (stored) {
      set({ musics: JSON.parse(stored) });
    }
  },

  setCurrentIndex: (index) => set({ currentIndex: index }),
  setIsPlaying: (value) => set({ isPlaying: value }),
  setProgress: (value) => set({ progress: value }),
  setDuration: (value) => set({ duration: value }),
  setPlayerRef: (ref) => set({ playerRef: ref }),

  toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),

  playNext: () => {
    const { isShuffle, musics, currentIndex, setCurrentIndex } = get();
    const nextIndex = isShuffle
      ? Math.floor(Math.random() * musics.length)
      : (currentIndex + 1) % musics.length;
    setCurrentIndex(nextIndex);
    set({ progress: 0, isPlaying: true });
  },

  toggleFavorite: (id) => {
    const updated = get().musics.map((music) =>
      music.id === id ? { ...music, isFavorite: !music.isFavorite } : music
    );
    set({ musics: updated });
    localStorage.setItem("musics", JSON.stringify(updated));
  },

  isFavorite: (id) => {
    const music = get().musics.find((m) => m.id === id);
    return music?.isFavorite ?? false;
  },

  setVolume: (value) => {
    set({ volume: value });
    const player = get().playerRef;
    if (player?.setVolume) {
      player.setVolume(value);
    }
  },
}));
