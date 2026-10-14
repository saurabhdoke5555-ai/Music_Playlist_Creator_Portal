# Music Playlist Creator Portal — FA-2 Phase II

Continuation of the FA-1 SoundShelf project.

## FA-2 features
- React Hooks: useState, useEffect, useMemo, useCallback, custom useDebounce
- React Router: Discover, Playlists, Create, Edit, Features and 404
- Forms & validation: controlled playlist form
- API integration: JSON Server
- CRUD: create/read/update/delete playlists
- Search & filter: debounced search and genre filter
- Error handling: API fallback, toast messages, ErrorBoundary and 404
- Responsive design
- Performance optimization: lazy routes, memoization, debounce
- Testing: Vitest rules tests
- Deployment preparation: Vercel SPA rewrite

## 20-song FA-1 catalog retained
Shape of You, Blinding Lights, Believer, Perfect, Someone Like You, Counting Stars,
Love Yourself, Faded, Let Her Go, Stay, Levitating, As It Was, Happier, Cheap Thrills,
Photograph, Memories, Attention, Demons, Dusk Till Dawn, Closer.

## Run
1. `npm.cmd install`
2. `npm.cmd run dev:full`
3. Open `http://localhost:5173`

`dev:full` starts Vite and JSON Server together. If preferred, run `npm.cmd run dev`
and `npm.cmd run api` in two terminals.

## Test and build
- `npm.cmd run test`
- `npm.cmd run build`

## API
JSON Server runs at `http://localhost:4000`.
Endpoints: `/songs` and `/playlists`.

## Spotify
The selected track is displayed through Spotify's official embed. Required Spotify attribution
is retained; the surrounding player is styled as SoundShelf.

## FA-2 demonstration
Demonstrate routing, search/filter, Spotify playback, playlist create/edit/delete,
form validation, API error/fallback behaviour, Hooks, performance techniques and tests.
