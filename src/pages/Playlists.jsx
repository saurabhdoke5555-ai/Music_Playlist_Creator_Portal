import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

export default function Playlists({ onToast }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  const load = async () => {
    setLoading(true);
    try { setItems(await api.getPlaylists()); setApiError(false); }
    catch { setApiError(true); onToast("Could not reach the playlist API.", "error"); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const remove = async (id) => {
    try { await api.deletePlaylist(id); setItems(items.filter(x => x.id !== id)); onToast("Playlist deleted."); }
    catch { onToast("Delete failed. Check JSON Server.", "error"); }
  };

  return <main className="page inner-page">
    <div className="page-title"><div><p className="eyebrow">PHASE II • CRUD</p><h1>My Playlists</h1><p>Create, edit and delete playlist records through the REST API.</p></div><Link className="primary-button" to="/playlists/new">+ Create Playlist</Link></div>
    {loading ? <div className="loading-state">Loading playlists…</div> :
      apiError ? <div className="error-state"><div className="empty-icon">!</div><h2>API unavailable</h2><p>Start JSON Server and try again.</p><button className="secondary-button" onClick={load}>Retry</button></div> :
      items.length === 0 ? <div className="empty-card"><h2>No saved playlists yet</h2><p>Create your first playlist to demonstrate POST and GET.</p><Link className="primary-button" to="/playlists/new">Create Playlist</Link></div> :
      <div className="playlist-cards">{items.map(item => <article className="playlist-card" key={item.id}><div><p className="eyebrow">{item.genre}</p><h2>{item.name}</h2><p>{item.description || "No description."}</p><span>{(item.tracks || []).length} tracks</span></div><div className="card-actions"><Link to={`/playlists/${item.id}/edit`} className="secondary-button">Edit</Link><button className="danger-button" onClick={() => remove(item.id)}>Delete</button></div></article>)}</div>}
  </main>;
}
