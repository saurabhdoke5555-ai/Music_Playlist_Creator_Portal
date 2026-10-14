const features = [
  ["React Hooks","useState, useEffect, useMemo, useCallback and custom useDebounce."],
  ["Routing","React Router navigation with nested page-level experiences and a 404 route."],
  ["Forms & Validation","Controlled playlist form with validation and reusable create/edit flow."],
  ["API + CRUD","JSON Server REST API for playlist create, read, update and delete operations."],
  ["Error Handling","API fallback, toast feedback, loading states, ErrorBoundary and 404."],
  ["Performance","Lazy route components, memoized filtering and debounced search."],
  ["Testing","Vitest tests for filtering, duplicate prevention and form validation rules."],
  ["Deployment","Vercel SPA rewrite and production build support; deployment remains optional."]
];
export default function About() {
  return <main className="page inner-page">
    <div className="page-title"><div><p className="eyebrow">FA-2 • ADVANCED FEATURES</p><h1>Phase-II Feature Map</h1><p>The FA-1 SoundShelf portal extended into a complete React application.</p></div></div>
    <div className="feature-grid">{features.map(([title,desc]) => <article className="feature-card" key={title}><span>✓</span><div><h2>{title}</h2><p>{desc}</p></div></article>)}</div>
  </main>;
}
