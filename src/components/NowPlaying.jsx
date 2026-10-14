export default function NowPlaying({ song }) {
  if (!song) return (
    <section className="now-playing placeholder-player">
      <div className="player-disc">♫</div>
      <div><p className="eyebrow">NOW PLAYING</p><h2>Select a song to play</h2><p>Choose any track from the library or your playlist.</p></div>
    </section>
  );
  const embedUrl = `https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator`;
  return (
    <section className="now-playing real-player">
      <div className="sound-shelf-player">
        <div className="sound-shelf-player-header">
          <div><p className="eyebrow">SOUNDSHELF PLAYER</p><strong>Now Playing</strong></div>
          <span className="source-badge">Spotify source</span>
        </div>
        <div className="track-preview">
          <div className={`player-art ${song.colorClass}`}><span>{song.emoji}</span></div>
          <div><h2>{song.title}</h2><p>{song.artist} · {song.album}</p></div>
        </div>
        <div className="spotify-embed-frame">
          <iframe key={song.spotifyId} src={embedUrl} title={`${song.title} by ${song.artist} — Spotify player`}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
        </div>
        <div className="player-attribution"><span>Music provided through Spotify</span>
          <a href={`https://open.spotify.com/track/${song.spotifyId}`} target="_blank" rel="noreferrer">Open on Spotify ↗</a>
        </div>
      </div>
    </section>
  );
}
