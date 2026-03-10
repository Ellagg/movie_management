const express = require("express");
const router = express.Router();
const db = require("../db-connector");

/**
 * Utility: coerce to integer or return null
 */
function toInt(value) {
  const n = Number(value);
  return Number.isInteger(n) ? n : null;
}

/**
 * GET /api/actorsMovies
 * Returns one row per movie with a comma-separated list of actor names.
 */
router.get("/", async (req, res) => {
  try {
    const querySelect = `
      SELECT 
        m.movieID,
        m.title AS movieTitle,
        GROUP_CONCAT(a.name ORDER BY a.name SEPARATOR ', ') AS actors
      FROM Movies m
      LEFT JOIN ActorsInMovies aim ON m.movieID = aim.movieID
      LEFT JOIN Actors a ON aim.actorID = a.actorID
      GROUP BY m.movieID, m.title
      ORDER BY m.movieID;
    `;
    const [rows] = await db.query(querySelect);
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Failed to get actors in movies: ", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch actors in movies" });
  }
});

/**
 * POST /api/actorsMovies/create
 * Body: { actorID, movieID }
 * Uses stored procedure: CALL AddActorToMovie(?, ?)
 */
router.post("/create", async (req, res) => {
  try {
    const actorID = toInt(req.body?.actorID);
    const movieID = toInt(req.body?.movieID);

    if (actorID == null || movieID == null) {
      return res.status(400).json({
        error: "actorID and movieID are required and must be integers",
      });
    }

    const sql = `CALL AddActorToMovie(?, ?)`;
    await db.query(sql, [actorID, movieID]);

    return res.status(201).json({
      message: "Actor added to movie successfully",
      actorID,
      movieID,
    });
  } catch (err) {
    // MySQL duplicate key error when (actorID, movieID) already exists
    if (err && (err.code === "ER_DUP_ENTRY" || err.errno === 1062)) {
      return res.status(409).json({
        error: "This actor is already associated with the specified movie",
      });
    }

    console.error("Failed to add actor to movie:", err);
    return res
      .status(500)
      .json({ error: "Failed to add actor to movie" });
  }
});

/**
 * PUT /api/actorsMovies/update
 * Body: { actorID, oldMovieID, newMovieID }
 * Uses stored procedure: CALL UpdateActorMovie(?, ?, ?)
 */
router.put("/update", async (req, res) => {
  try {
    const actorID = toInt(req.body?.actorID);
    const oldMovieID = toInt(req.body?.oldMovieID);
    const newMovieID = toInt(req.body?.newMovieID);

    if (
      actorID == null ||
      oldMovieID == null ||
      newMovieID == null
    ) {
      return res.status(400).json({
        error:
          "actorID, oldMovieID, and newMovieID are required and must be integers",
      });
    }

    // Optional: short-circuit if no change
    if (oldMovieID === newMovieID) {
      return res.status(200).json({
        message: "No changes made (oldMovieID and newMovieID are the same).",
        actorID,
        movieID: newMovieID,
      });
    }

    const sql = `CALL UpdateActorMovie(?, ?, ?)`;
    await db.query(sql, [actorID, oldMovieID, newMovieID]);

    return res.status(200).json({
      message: "Actor's movie association updated successfully",
      actorID,
      oldMovieID,
      newMovieID,
    });
  } catch (err) {
    // Handle duplicate update (moving to an association that already exists)
    if (err && (err.code === "ER_DUP_ENTRY" || err.errno === 1062)) {
      return res.status(409).json({
        error:
          "The target association already exists (actor is already linked to newMovieID)",
      });
    }

    console.error("Failed to update actor's movie association:", err);
    return res
      .status(500)
      .json({ error: "Failed to update actor's movie association" });
  }
});

/**
 * DELETE /api/actorsMovies/delete
 * Body (preferred) or Query: { actorID, movieID }
 * Uses stored procedure: CALL RemoveActorFromMovie(?, ?)
 *
 * NOTE: Some clients/browsers don't send bodies on DELETE reliably.
 * We accept both body and query for better ergonomics.
 */
router.delete("/delete", async (req, res) => {
  try {
    // accept from body or query
    const actorID = toInt(req.body?.actorID ?? req.query?.actorID);
    const movieID = toInt(req.body?.movieID ?? req.query?.movieID);

    if (actorID == null || movieID == null) {
      return res.status(400).json({
        error:
          "actorID and movieID are required (provide as JSON body or query params) and must be integers",
      });
    }

    const sql = `CALL RemoveActorFromMovie(?, ?)`;
    await db.query(sql, [actorID, movieID]);

    // Even if nothing was removed (no matching row), the stored proc will succeed.
    return res.status(200).json({
      message: "Actor removed from movie (idempotent).",
      actorID,
      movieID,
    });
  } catch (err) {
    console.error("Failed to remove actor from movie:", err);
    return res
      .status(500)
      .json({ error: "Failed to remove actor from movie" });
  }
});

module.exports = router;