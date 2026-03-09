const express = require("express")
const router = express.Router()
const db = require("../db-connector")

router.get('/', async (req, res) => {
    try{
      const querySelect = "CALL list_genres()"
      const [rows] = await db.query(querySelect);
      res.status(200).send(rows[0]);
    } catch (err) {
      console.error("Failed to get genres: ", err);
      res.status(500).json({ error: "Failed to fetch genres" });
    }
});
router.post("/create", async (req, res) => {
  try {
    const { genreName } = req.body; // expects { "genreName": "Comedy" }

    if (!genreName) {
      return res.status(400).json({ error: "genreName is required" });
    }

    const queryInsert = "CALL add_genre()";

    const [result] = await db.query(queryInsert, [genreName]);

    // Return the newly created genre and generated ID
    res.status(201).json({ genreID: result.insertId, genreName });

  } catch (err) {
    console.error("Failed to create genre:", err);
    res.status(500).json({ error: "Failed to create genre" });
  }
});
router.delete('/delete/:id', async (req, res) => {
  try{
    const genreID = req.params.id;
    
    if (!genreID) {
      return res.status(400).json({ error: "genreID required" });
    }

    const queryDelete = "CALL delete_genre(?)";

    await db.query(queryDelete, [genreID]);

    res.status(200).json({ message: "Genre deleted successfully" });

  } catch (err) {
    console.error("Failed to delete genre:", err);
    res.status(500).json({ error: "Failed to delete genre" });
  }
});
router.put('/update', async (req, res) => {
  try{
    const { genreID, genreName } = req.body;

    if (!genreID || !genreName) {
      return res.status(400).json({ error: "genreID and genreName required" });
    }

    const queryUpdate = "CALL update_genre(?, ?)";

    await db.query(queryUpdate, [genreID, genreName]);

    res.status(200).json({ message: "Genre updated successfully" });

  } catch(err) {

    console.error("Failed to update genre:", err);
    res.status(500).json({ error: "Failed to update genre" });

  }
});

module.exports = router;