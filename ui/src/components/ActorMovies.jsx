import React, { useEffect, useMemo, useState } from "react";
import "./css/UpdateActors.css";

const API_BASE = "http://classwork.engr.oregonstate.edu:7689/api";

export default function ActorsMovies() {
  // Data sources
  const [actors, setActors] = useState([]);                 // [{ id, name }]
  const [movies, setMovies] = useState([]);                 // [{ id, title }]
  const [overview, setOverview] = useState([]);             // [{ movieID, movieTitle, actors: "A, B, ..." }]

  // UI state
  const [selectedActor, setSelectedActor] = useState(null); // number | null
  const [selectedMovieIds, setSelectedMovieIds] = useState([]); // number[] - current working selection for the actor
  const [originalMovieIds, setOriginalMovieIds] = useState([]); // number[] - snapshot to diff on save

  // UX states
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  // -------- Fetch & normalize --------
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        setSaveMsg("");

        // Fetch actors, movies, and overview list in parallel
        const [actorsRes, moviesRes, overviewRes] = await Promise.all([
          fetch(`${API_BASE}/actors`),
          fetch(`${API_BASE}/movies`),
          fetch(`${API_BASE}/actorsMovies`), // plural
        ]);

        if (!actorsRes.ok) throw new Error(`Actors fetch failed (${actorsRes.status})`);
        if (!moviesRes.ok) throw new Error(`Movies fetch failed (${moviesRes.status})`);
        if (!overviewRes.ok) throw new Error(`Actor-Movie overview fetch failed (${overviewRes.status})`);

        const [actorsData, moviesData, overviewData] = await Promise.all([
          actorsRes.json(),
          moviesRes.json(),
          overviewRes.json(),
        ]);

        // Normalize actors
        const normActors = (Array.isArray(actorsData) ? actorsData : []).map(a => ({
          id: a.actorID ?? a.actorId ?? a.id,            // prefer actorID
          name: a.name ?? a.actorName ?? "",
        })).filter(a => a.id != null && a.name);

        // Normalize movies
        const normMovies = (Array.isArray(moviesData) ? moviesData : []).map(m => ({
          id: m.movieID ?? m.movieId ?? m.id,            // prefer movieID
          title: m.title ?? m.movieTitle ?? "",
        })).filter(m => m.id != null && m.title);

        // Overview (already shaped by your route)
        const normOverview = (Array.isArray(overviewData) ? overviewData : []).map(row => ({
          movieID: row.movieID,
          movieTitle: row.movieTitle ?? row.title ?? "",
          actors: row.actors ?? "",
        }));

        setActors(normActors);
        setMovies(normMovies);
        setOverview(normOverview);

        // Initialize selection to first actor if none selected
        if (!selectedActor && normActors.length > 0) {
          setSelectedActor(normActors[0].id);
        }
      } catch (e) {
        console.error(e);
        setErr(e.message || "Failed to fetch initial data");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resolve the selected actor's name for matching
  const selectedActorName = useMemo(() => {
    const a = actors.find(x => x.id === selectedActor);
    return a?.name || "";
  }, [actors, selectedActor]);

  // Derive the actor's currently-linked movie IDs from the overview list.
  // (Uses actor Name matching because we don’t yet have a GET /for-actor/:actorID endpoint.)
  useEffect(() => {
    if (!selectedActor || !selectedActorName) {
      setSelectedMovieIds([]);
      setOriginalMovieIds([]);
      return;
    }

    // Build set: movies where the 'actors' CSV contains selectedActorName (exact token match)
    const ids = overview
      .filter(row => {
        if (!row.actors) return false;
        const tokens = row.actors.split(",").map(s => s.trim());
        return tokens.some(t => t === selectedActorName);
      })
      .map(row => Number(row.movieID));

    setSelectedMovieIds(ids);
    setOriginalMovieIds(ids); // snapshot for diff
  }, [overview, selectedActor, selectedActorName]);

  // Toggle checkbox for a movie
  const toggleMovie = (movieId) => {
    setSelectedMovieIds(prev => {
      const has = prev.includes(movieId);
      return has ? prev.filter(id => id !== movieId) : [...prev, movieId];
    });
    setSaveMsg("");
  };

  // Save changes: diff original vs current selection
  const handleSave = async () => {
    if (!selectedActor) return;
    try {
      setSaving(true);
      setErr("");
      setSaveMsg("");

      const nowSet = new Set(selectedMovieIds);
      const origSet = new Set(originalMovieIds);

      const toAdd = movies
        .map(m => m.id)
        .filter(id => nowSet.has(id) && !origSet.has(id));

      const toRemove = movies
        .map(m => m.id)
        .filter(id => !nowSet.has(id) && origSet.has(id));

      // Short-circuit if nothing changed
      if (toAdd.length === 0 && toRemove.length === 0) {
        setSaveMsg("No changes to save.");
        return;
      }

      // Fire API calls
      const addCalls = toAdd.map(movieID =>
        fetch(`${API_BASE}/actorsMovies/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ actorID: selectedActor, movieID }),
        })
      );

      const removeCalls = toRemove.map(movieID =>
        fetch(`${API_BASE}/actorsMovies/delete?actorID=${encodeURIComponent(selectedActor)}&movieID=${encodeURIComponent(movieID)}`, {
          method: "DELETE",
        })
      );

      const results = await Promise.allSettled([...addCalls, ...removeCalls]);

      const rejected = results.filter(r => r.status === "rejected");
      const nonOk = [];
      for (const r of results) {
        if (r.status === "fulfilled") {
          // Check HTTP status
          try {
            if (!r.value.ok) nonOk.push(r.value.status);
          } catch {}
        }
      }

      if (rejected.length > 0 || nonOk.length > 0) {
        setErr(`Some changes failed. (${rejected.length} network errors; ${nonOk.length} non-OK responses)`);
      } else {
        setSaveMsg("Changes saved.");
        // Refresh the overview to reflect new associations
        try {
          const refreshed = await fetch(`${API_BASE}/actorsMovies`);
          if (refreshed.ok) {
            const data = await refreshed.json();
            const normOverview = (Array.isArray(data) ? data : []).map(row => ({
              movieID: row.movieID,
              movieTitle: row.movieTitle ?? row.title ?? "",
              actors: row.actors ?? "",
            }));
            setOverview(normOverview);
            // Also update original snapshot to current
            setOriginalMovieIds([...selectedMovieIds]);
          }
        } catch {}
      }
    } catch (e) {
      console.error(e);
      setErr(e.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  // -------- Render --------
  if (loading) {
    return (
      <div className="update-container">
        <p>Loading…</p>
      </div>
    );
  }
  
  return (
    <div className="side-by-side">
      {/* Left panel: Movies + Actors overview */}
      <div className="update-container">
        <h2>Movies and Actors</h2>
        {err && <p style={{ color: "crimson" }}>{err}</p>}
        {overview.length === 0 ? (
          <p>No movies found.</p>
        ) : (
          <ul>
            {overview.map((m) => (
              <li key={String(m.movieID)}>
                <strong>{m.movieTitle}</strong>
                <br />
                Actors: {m.actors || "—"}
              </li>
            ))}
          </ul>
        )}
      </div>
  
      {/* Right panel: Update form */}
      <div className="update-container">
        <h2>Update the movies an actor has been in</h2>
  
        {/* Actor Dropdown */}
        <label htmlFor="actorSel">Select Actor:</label>
        <select
          id="actorSel"
          value={selectedActor ?? ""}
          onChange={(e) => setSelectedActor(Number(e.target.value))}
        >
          {actors.map((actor) => (
            <option key={actor.id} value={actor.id}>
              {actor.name}
            </option>
          ))}
        </select>
  
        <h3>Movies</h3>
        <div className="movie-checkbox-list">
          {movies.map((movie) => (
            <label key={String(movie.id)} className="movie-checkbox-item">
              <input
                type="checkbox"
                checked={selectedMovieIds.includes(movie.id)}
                onChange={() => toggleMovie(movie.id)}
              />
              {movie.title}
            </label>
          ))}
        </div>
  
        <button className="update-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save Changes"}
        </button>
        {saveMsg && <p style={{ color: "green", marginTop: 8 }}>{saveMsg}</p>}
      </div>
    </div>
  );
}