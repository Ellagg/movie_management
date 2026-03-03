const express = require("express");
const router = express.Router();
const db = require("../db-connector");

router.get('/', async (req, res) => {
    try{
      const querySelect = 'SELECT * FROM Actors;'
      const [rows] = await db.query(querySelect);
      res.status(200).send(rows);
    } catch (err) {
      console.error("Failed to get actors: ", err);
      res.status(500).json({ error: "Failed to fetch actors" });
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