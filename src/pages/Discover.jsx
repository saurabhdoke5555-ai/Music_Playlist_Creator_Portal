import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import SongCard from "../components/SongCard";
import Playlist from "../components/Playlist";
import NowPlaying from "../components/NowPlaying";
import Stats from "../components/Stats";
import { genres, songs as bundledSongs } from "../data/songs";
import { api } from "../services/api";
import { useDebounce, useToast } from "../hooks";
import { addUniqueSong, filterSongs } from "../utils";

export default function Discover({ onPlaylistCountChange, onToast }) {
  const [songs, setSongs] = useState(bundledSongs);
  const [playlist, setPlaylist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [currentSong, setCurrentSong] = useState(null);
  const [apiOnline, setApiOnline] = useState(false);
  const debouncedSearch = useDebounce(searchTerm);

  useEffect(() => {
    let active = true;
    api.getSongs().then(data => { if (active) { setSongs(data); setApiOnline(true); } })
      .catch(() => { if (active) onToast("API unavailable — using bundled song data.", "error"); });
    api.getPlaylists().then(data => {
      if (!active) return;
      const first = data[0];
      const tracks = first?.tracks || [];
      setPlaylist(tracks);
      onPlaylistCountChange(tracks.length);
    }).catch(() => {});
    return () => { active = false; };
  }, [onPlaylistCountChange, onToast]);

  const filteredSongs = useMemo(() => filterSongs(songs, debouncedSearch, selectedGenre), [songs, debouncedSearch, selectedGenre]);
  const headingText = useMemo(() => {
    if (searchTerm) return `Results for "${searchTerm}"`;
    if (selectedGenre !== "All") return `${selectedGenre} Tracks`;
    return "Discover Music";
  }, [searchTerm, selectedGenre]);
  const genreList = useMemo(() => ["All", ...new Set(songs.map(s => s.genre))], [songs]);

  const savePlaylist = async (nextTracks) => {
    setPlaylist(nextTracks);
    onPlaylistCountChange(nextTracks.length);
    try {
      const existing = await api.getPlaylists();
      const first = existing[0];
      if (first) await api.updatePlaylist(first.id, { ...first, tracks: nextTracks });
      else await api.createPlaylist({ name: "My Playlist", genre: "Mixed", description: "SoundShelf collection", tracks: nextTracks });
      setApiOnline(true);
    } catch { onToast("Saved in this session. Start JSON Server to persist playlist data.", "error"); }
  };

  const add = (song) => {
    const next = addUniqueSong(playlist, song);
    if (next.length === playlist.length) return onToast("Song is already in your playlist.", "error");
    savePlaylist(next); onToast(`${song.title} added to My Playlist.`);
  };
  const remove = (id) => {
    const song = playlist.find(s => s.id === id);
    savePlaylist(playlist.filter(s => s.id !== id)); if (song) onToast(`${song.title} removed.`);
  };
  const clear = () => { savePlaylist([]); onToast("Playlist cleared."); };

  return (
    <main className="page">
      <section className="hero">
        <div><span className="hero-pill">FA-2 • PHASE II</span>
          <h2>Create a playlist that feels like <em>you.</em></h2>
          <p>Discover popular English songs, search and filter your library, manage playlists and play selected tracks.</p>
        </div>
        <div className="hero-note"><span>♫</span><div><strong>Advanced. Personal. Musical.</strong><small>Hooks • Routing • API • CRUD • Testing</small></div></div>
      </section>
      <Stats libraryCount={songs.length} playlistCount={playlist.length} genreCount={genreList.length - 1} />
      <div className="api-status"><span className={apiOnline ? "status-dot online" : "status-dot"}></span>{apiOnline ? "API connected" : "Local fallback mode"}</div>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} selectedGenre={selectedGenre} onGenreChange={setSelectedGenre} genres={genreList} />
      <div className="content-grid">
        <section className="library-section">
          <div className="section-heading"><div><p className="eyebrow">MUSIC LIBRARY</p><h2>{headingText}</h2></div><span className="result-count">{filteredSongs.length} tracks</span></div>
          {filteredSongs.length === 0 ? <div className="no-results"><div className="empty-icon">⌕</div><h3>No tracks found</h3><p>Try a different song, artist, album, or genre.</p><button className="secondary-button" onClick={() => {setSearchTerm("");setSelectedGenre("All");}}>Reset filters</button></div>
          : <div className="song-grid">{filteredSongs.map(song => <SongCard key={song.id} song={song} isInPlaylist={playlist.some(item => item.id === song.id)} onAdd={add} onRemove={remove} onSelect={setCurrentSong}/>)}</div>}
        </section>
        <Playlist playlist={playlist} currentSong={currentSong} onSelect={setCurrentSong} onRemove={remove} onClear={clear}/>
      </div>
      <NowPlaying song={currentSong}/>
    </main>
  );
}
