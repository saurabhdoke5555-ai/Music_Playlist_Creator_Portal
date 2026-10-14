import React from "react";
export default function SearchBar({ searchTerm, onSearchChange, selectedGenre, onGenreChange, genres }) {
  return (
    <section className="toolbar">
      <div className="search-box">
        <span aria-hidden="true">⌕</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by song, artist or album..."
          aria-label="Search songs"
        />
        {searchTerm && (
          <button className="clear-button" onClick={() => onSearchChange("")} aria-label="Clear search">
            ×
          </button>
        )}
      </div>

      <div className="filter-box">
        <label htmlFor="genre">Genre</label>
        <select id="genre" value={selectedGenre} onChange={(event) => onGenreChange(event.target.value)}>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
