import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { validatePlaylist } from "../utils";

export default function PlaylistForm({ onToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const [values, setValues] = useState({ name: "", genre: "Pop", description: "", tracks: [] });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(editing);

  useEffect(() => {
    if (!editing) return;
    api.getPlaylist(id).then(data => setValues(data)).catch(() => onToast("Playlist could not be loaded.", "error")).finally(() => setLoading(false));
  }, [id]);

  const change = e => setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  const submit = async e => {
    e.preventDefault();
    const nextErrors = validatePlaylist(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    try {
      if (editing) await api.updatePlaylist(id, values);
      else await api.createPlaylist(values);
      onToast(editing ? "Playlist updated." : "Playlist created.");
      navigate("/playlists");
    } catch { onToast("Save failed. Start JSON Server and try again.", "error"); }
  };

  if (loading) return <main className="page inner-page"><div className="loading-state">Loading playlist…</div></main>;

  return <main className="page inner-page">
    <div className="page-title"><div><p className="eyebrow">PHASE II • FORM + VALIDATION</p><h1>{editing ? "Edit Playlist" : "Create Playlist"}</h1><p>Controlled React form with validation and API persistence.</p></div></div>
    <form className="playlist-form" onSubmit={submit} noValidate>
      <label>Playlist name<input name="name" value={values.name} onChange={change} placeholder="e.g. Weekend Vibes" maxLength={30}/>{errors.name && <span className="field-error">{errors.name}</span>}</label>
      <label>Genre<select name="genre" value={values.genre} onChange={change}><option>Pop</option><option>Rock</option><option>Electronic</option><option>Ballad</option><option>Dance</option><option>Indie</option><option>Acoustic</option><option>Romance</option></select>{errors.genre && <span className="field-error">{errors.genre}</span>}</label>
      <label>Description<textarea name="description" value={values.description} onChange={change} rows="5" maxLength={120} placeholder="Describe the mood of this playlist"/>{errors.description && <span className="field-error">{errors.description}</span>}<small>{values.description.length}/120</small></label>
      <div className="form-actions"><Link className="secondary-button" to="/playlists">Cancel</Link><button className="primary-button" type="submit">{editing ? "Update Playlist" : "Save Playlist"}</button></div>
    </form>
  </main>;
}
