const express = require("express");
const router = express.Router();
const db = require("../db-connector");

router.get('/', async (req, res) => {
    try{
      const querySelect = `
        SELECT 
            m.movieID,
            m.title AS movieTitle,
            GROUP_CONCAT(a.name ORDER BY a.name SEPARATOR ', ') AS actors
        FROM Movies m
        LEFT JOIN ActorsInMovies aim ON m.movieID = aim.movieID
        LEFT JOIN Actors a ON aim.actorID = a.actorID
        GROUP BY m.movieID, m.title
        ORDER BY m.movieID;`
      const [rows] = await db.query(querySelect);
      res.status(200).send(rows);
    } catch (err) {
      console.error("Failed to get actors in movies: ", err);
      res.status(500).json({ error: "Failed to fetch actors in movies" });
    }
});
router.post('/create', async (req, res) => {
    try{

    } catch {

    }
});
router.delete('/delete', async (req, res) => {
    try{

    } catch {

    }
});
router.put('/update', async (req, res) => {
    try{

    } catch {

    }
});

module.exports = router;