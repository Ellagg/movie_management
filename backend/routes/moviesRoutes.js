const express = require("express");
const router = express.Router();
const db = require("../db-connector");

/**
 * GET /api/movies
 * Returns movies with IDs + friendly names for display.
 * Aliases match what the frontend expects: movieID, title, releaseDate, genreID, genreName, directorID, directorName
 */
router.get("/", async (req, res) => {
  try {
    const querySelect = `
      SELECT 
        m.movieID            AS movieID,
        m.title              AS title,
        m.releaseDate        AS releaseDate,
        g.genreID            AS genreID,
        g.genreName          AS genreName,
        d.directorID         AS directorID,
        d.name               AS directorName
      FROM Movies m
      JOIN Genres g     ON m.genreID = g.genreID
      JOIN Directors d  ON m.directorID = d.directorID
      ORDER BY m.movieID;
    `;
    const [rows] = await db.query(querySelect);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Failed to get movies: ", err);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

/**
 * POST /api/movies/create
 * Body: { title, releaseDate, genreID, directorID }
 */
router.post("/create", async (req, res) => {
  try {
    const { title, releaseDate, genreID, directorID } = req.body;

    // Use explicit null/undefined checks for numeric fields
    if (
      !title ||
      !releaseDate ||
      genreID == null ||
      directorID == null
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `CALL add_movie(?, ?, ?, ?)`;
    await db.query(query, [title, releaseDate, genreID, directorID]);

    res.status(201).json({ message: "Movie created successfully" });
  } catch (err) {
    console.error("Failed to create movie:", err);
    res.status(500).json({ error: "Failed to create movie" });
  }
});

/**
 * DELETE /api/movies/delete
 * Body: { movieID }
 */
router.delete("/delete", async (req, res) => {
  try {
    const { movieID } = req.body;

    if (movieID == null) {
      return res.status(400).json({ error: "movieID is required" });
    }

    const query = `CALL delete_movie(?)`;
    await db.query(query, [movieID]);

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error("Failed to delete movie:", err);
    res.status(500).json({ error: "Failed to delete movie" });
  }
});

/**
 * PUT /api/movies/update
 * Body: { movieID, title, releaseDate, genreID, directorID }
 */
router.put("/update", async (req, res) => {
  try {
    const { movieID, title, releaseDate, genreID, directorID } = req.body;

    if (
      movieID == null ||
      !title ||
      !releaseDate ||
      genreID == null ||
      directorID == null
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `CALL update_movie(?, ?, ?, ?, ?)`;
    await db.query(query, [movieID, title, releaseDate, genreID, directorID]);

    res.status(200).json({ message: "Movie updated successfully" });
  } catch (err) {
    console.error("Failed to update movie:", err);
    res.status(500).json({ error: "Failed to update movie" });
  }
});

module.exports = router;