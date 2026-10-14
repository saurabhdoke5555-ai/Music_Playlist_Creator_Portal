import { Link } from "react-router-dom";
export default function Playlist({ playlist, currentSong, onSelect, onRemove, onClear }) {
  return (
    <aside className="playlist-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">YOUR COLLECTION</p>
          <h2>My Playlist</h2>
        </div>
        {playlist.length > 0 && <button className="text-button" onClick={onClear}>Clear all</button>}
      </div>
      {playlist.length === 0 ? (
        <div className="empty-playlist">
          <div className="empty-icon">♫</div>
          <h3>Your playlist is empty</h3>
          <p>Add songs from the library to build your personal mix.</p>
        </div>
      ) : (
        <div className="playlist-list">
          {playlist.map((song, index) => (
            <div className={`playlist-item ${currentSong?.id === song.id ? "active" : ""}`} key={song.id}
              onClick={() => onSelect(song)} role="button" tabIndex="0"
              onKeyDown={(e) => e.key === "Enter" && onSelect(song)}>
              <span className="track-number">{String(index + 1).padStart(2, "0")}</span>
              <div className={`mini-cover ${song.colorClass}`}>{song.emoji}</div>
              <div className="playlist-song-info"><strong>{song.title}</strong><span>{song.artist}</span></div>
              <button className="icon-button" onClick={(e) => { e.stopPropagation(); onRemove(song.id); }} aria-label={`Remove ${song.title}`}>×</button>
            </div>
          ))}
        </div>
      )}
      <div className="playlist-summary">
        <span>{playlist.length} {playlist.length === 1 ? "track" : "tracks"}</span>
        <Link className="mini-link" to="/playlists">Manage</Link>
      </div>
    </aside>
  );
}
