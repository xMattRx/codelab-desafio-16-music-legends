import { create } from "zustand";

export interface Music {
    id: string;
    title: string;
    artist: string;
    youtubeUrl: string;
    coverUrl?: string;
}

interface MusicStore {
    musics: Music[];
    currentIndex: number;
    isPlaying: boolean;
    progress: number;
    duration: number;
    playerRef: any;
    setMusics: (musics: Music[]) => void;
    loadFromStorage: () => void;
    setCurrentIndex: (index: number) => void;
    setIsPlaying: (value: boolean) => void;
    setProgress: (value: number) => void;
    setDuration: (value: number) => void;
    setPlayerRef: (ref: any) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
    musics: [],
    currentIndex: 0,
    isPlaying: false,
    progress: 0,
    duration: 0,
    playerRef: null,
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
}));
