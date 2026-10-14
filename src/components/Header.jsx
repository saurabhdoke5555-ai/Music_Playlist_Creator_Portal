import React from "react";
export default function Header({ playlistCount }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark">♫</div>
        <div>
          <h1>SoundShelf</h1>
          <p>Music Playlist Creator Portal</p>
        </div>
      </div>

      <div className="playlist-badge" aria-label={`${playlistCount} songs in playlist`}>
        <span>♪</span>
        <strong>{playlistCount}</strong>
        <span>in playlist</span>
      </div>
    </header>
  );
}
