import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import { api } from "./services/api";

const Discover = lazy(() => import("./pages/Discover"));
const Playlists = lazy(() => import("./pages/Playlists"));
const PlaylistForm = lazy(() => import("./pages/PlaylistForm"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const [playlistCount, setPlaylistCount] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    api.getPlaylists().then(data => setPlaylistCount(data[0]?.tracks?.length || 0)).catch(() => {});
  }, []);

  const onToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    window.clearTimeout(window.__soundShelfToast);
    window.__soundShelfToast = window.setTimeout(() => setToast(null), 2600);
  }, []);

  return (
    <ErrorBoundary>
      <Layout playlistCount={playlistCount} toast={toast}>
        <Suspense fallback={<main className="page inner-page"><div className="loading-state">Loading page…</div></main>}>
          <Routes>
            <Route path="/" element={<Discover onPlaylistCountChange={setPlaylistCount} onToast={onToast} />} />
            <Route path="/playlists" element={<Playlists onToast={onToast} />} />
            <Route path="/playlists/new" element={<PlaylistForm onToast={onToast} />} />
            <Route path="/playlists/:id/edit" element={<PlaylistForm onToast={onToast} />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
}
