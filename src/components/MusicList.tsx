import MusicCard from './MusicCard'

const musics = [
  { title: 'Warriors', artist: 'Imagine Dragons', cover: '/album-cover.png' },
  { title: 'Legends Never Die', artist: 'Against The Current', cover: '/album-cover.png' },
  { title: 'Rise', artist: 'The Glitch Mob', cover: '/album-cover.png' },
]

function MusicList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {musics.map((music, idx) => (
        <MusicCard key={idx} {...music} />
      ))}
    </div>
  )
}

export default MusicList
