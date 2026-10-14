import React from "react";
export default function SongCard({ song, isInPlaylist, onAdd, onRemove, onSelect }) {
  return (
    <article className="song-card">
      <button className={`cover ${song.colorClass}`} onClick={() => onSelect(song)} aria-label={`Select ${song.title}`}>
        <span>{song.emoji}</span>
        <small>{song.genre}</small>
      </button>

      <div className="song-details">
        <div className="song-title-row">
          <div>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
          </div>
          <span className="duration">{song.duration}</span>
        </div>

        <p className="album">{song.album}</p>

        <button
          className={`action-button ${isInPlaylist ? "remove" : ""}`}
          onClick={() => (isInPlaylist ? onRemove(song.id) : onAdd(song))}
        >
          {isInPlaylist ? "✓ Added — Remove" : "+ Add to Playlist"}
        </button>
      </div>
    </article>
  );
}
