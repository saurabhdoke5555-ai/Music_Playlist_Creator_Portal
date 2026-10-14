import { NavLink } from "react-router-dom";
import Header from "./Header";
import Toast from "./Toast";

export default function Layout({ playlistCount, toast, children }) {
  return (
    <div className="app-shell">
      <Header playlistCount={playlistCount} />
      <nav className="main-nav">
        <NavLink to="/" end>Discover</NavLink>
        <NavLink to="/playlists">My Playlists</NavLink>
        <NavLink to="/playlists/new">Create Playlist</NavLink>
        <NavLink to="/about">FA-2 Features</NavLink>
      </nav>
      {children}
      <Toast toast={toast} />
      <footer className="footer">
        <span>Music Playlist Creator Portal</span>
        <span>React.js + JavaScript ES6+ • FA-2 Phase II</span>
      </footer>
    </div>
  );
}
