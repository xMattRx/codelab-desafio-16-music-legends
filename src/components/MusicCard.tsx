interface MusicCardProps {
  title: string
  artist: string
  cover: string
}

function MusicCard({ title, artist, cover }: MusicCardProps) {
  return (
    <div className="bg-dark20 p-4 rounded-lg shadow hover:scale-105 transition-transform">
      <img src={cover} alt={title} className="w-full h-40 object-cover rounded" />
      <h3 className="mt-2 text-white font-bold">{title}</h3>
      <p className="text-dark30">{artist}</p>
    </div>
  )
}

export default MusicCard
