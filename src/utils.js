export function filterSongs(songs, searchTerm = "", selectedGenre = "All") {
  const query = searchTerm.trim().toLowerCase();
  return songs.filter((song) => {
    const matchesGenre = selectedGenre === "All" || song.genre === selectedGenre;
    const matchesSearch = !query || [song.title, song.artist, song.album, song.genre]
      .some((field) => field.toLowerCase().includes(query));
    return matchesGenre && matchesSearch;
  });
}

export function addUniqueSong(playlist, song) {
  return playlist.some((item) => item.id === song.id) ? playlist : [...playlist, song];
}

export function validatePlaylist(values) {
  const errors = {};
  const name = values.name.trim();
  const description = values.description.trim();
  if (name.length < 3) errors.name = "Playlist name must be at least 3 characters.";
  if (name.length > 30) errors.name = "Playlist name must not exceed 30 characters.";
  if (!values.genre) errors.genre = "Please select a genre.";
  if (description.length > 120) errors.description = "Description must not exceed 120 characters.";
  return errors;
}
