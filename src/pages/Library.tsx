import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMusicStore } from "../store/musicStore";

interface Music {
  id: string;
  title: string;
  artist: string;
  youtubeUrl: string;
  coverUrl?: string;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

async function fetchYoutubeMetadata(videoId: string) {
  const oEmbedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  const response = await fetch(oEmbedUrl);
  if (!response.ok) throw new Error("Não foi possível obter os dados do vídeo");
  return await response.json();
}

function Library() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const musics = useMusicStore((state) => state.musics);
  const setMusics = useMusicStore((state) => state.setMusics);

  useEffect(() => {
    const stored = localStorage.getItem("musics");
    if (stored) {
      setMusics(JSON.parse(stored));
    }
  }, [setMusics]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!youtubeUrl) return;

    const videoId = extractYouTubeId(youtubeUrl);
    if (!videoId) return alert("URL do YouTube inválida");

    try {
      const meta = await fetchYoutubeMetadata(videoId);

      const newMusic: Music = {
        id: uuidv4(),
        title: meta.title,
        artist: meta.author_name,
        youtubeUrl,
        coverUrl: meta.thumbnail_url,
      };

      const updated = [...musics, newMusic];
      setMusics(updated);
      localStorage.setItem("musics", JSON.stringify(updated));
      setYoutubeUrl("");
    } catch (err) {
      alert("Erro ao obter os dados do vídeo");
    }
  };

  return (
    <div className="min-h-screen bg-[url('/album-cover.png')] bg-[length:500%] md:bg-[length:210%] lg:bg-[length:160%] xl:bg-[length:140%] bg-[center_top_20%] bg-no-repeat text-white font-lexend flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center flex-grow py-12 px-6 bg-black/60 backdrop-blur-md rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <span className="text-purple-400">🎵</span> Biblioteca de Músicas
        </h1>

        <ul className="mb-10 space-y-4 max-w-md w-full">
          {musics.map((music) => (
            <li key={music.id} className="flex flex-col sm:flex-row items-start gap-4">
              {music.coverUrl && (
                <img
                  src={music.coverUrl}
                  alt="Capa"
                  className="w-16 h-16 rounded object-cover"
                />
              )}
              <div className="w-full">
                <p className="font-semibold">{music.title}</p>
                <p className="text-sm text-gray-400">{music.artist}</p>
              </div>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full border-t border-gray-700 pt-6">
          <h2 className="text-xl font-semibold">Adicionar via YouTube</h2>
          <input
            className="p-2 bg-[#1c1c1c] rounded"
            type="url"
            placeholder="Cole aqui a URL do YouTube"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-bold mt-2"
          >
            Salvar Música
          </button>
        </form>
      </div>
    </div>
  );
}

export default Library;