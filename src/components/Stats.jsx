import React from "react";
export default function Stats({ libraryCount, playlistCount, genreCount }) {
  const stats = [
    { label: "Library Tracks", value: libraryCount, icon: "♫" },
    { label: "Playlist Tracks", value: playlistCount, icon: "▤" },
    { label: "Genres", value: genreCount, icon: "◈" }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <div className="stat-icon">{stat.icon}</div>
          <div>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
