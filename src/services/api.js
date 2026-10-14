const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!response.ok) throw new Error(`API request failed (${response.status})`);
  return response.status === 204 ? null : response.json();
}

export const api = {
  getSongs: () => request("/songs"),
  getPlaylists: () => request("/playlists"),
  getPlaylist: (id) => request(`/playlists/${id}`),
  createPlaylist: (payload) => request("/playlists", { method: "POST", body: JSON.stringify(payload) }),
  updatePlaylist: (id, payload) => request(`/playlists/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deletePlaylist: (id) => request(`/playlists/${id}`, { method: "DELETE" }),
};
