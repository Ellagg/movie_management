const express = require("express");
const router = express.Router();
const db = require("../db-connector");

/** Helpers */
const toInt = (v) => {
  const n = Number(v);
  return Number.isInteger(n) ? n : null;
};

const isNonEmptyString = (s) =>
  typeof s === "string" && s.trim().length > 0;

const isIsoDate = (s) => {
  // Accepts YYYY-MM-DD (basic front-end date input format)
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
};

/**
 * GET /api/actors
 * Returns all actors
 */
router.get("/", async (_req, res) => {
  try {
    const sql = `
      SELECT actorID, name, age, dob
      FROM Actors
      ORDER BY actorID;
    `;
    const [rows] = await db.query(sql);
    return res.status(200).json(rows);
  } catch (err) {
    console.error("Failed to get actors:", err);
    return res.status(500).json({ error: "Failed to fetch actors" });
  }
});

/**
 * POST /api/actors/create
 * Body: { name, age, dob }
 * Uses stored procedure: CALL add_actor(?, ?, ?)
 */
// routes/actorsRoutes.js (CREATE)
router.post('/create', async (req, res) => {
  try {
    const { name, age, dob } = req.body;

    if (!name || !age || !dob) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await db.query("CALL add_actor(?, ?, ?)", [name, age, dob]);

    res.status(201).json({ message: "Actor created successfully" });
  } catch (err) {
    console.error("Failed to create actor:", err);
    res.status(500).json({ error: "Failed to create actor" });
  }
});

/**
 * PUT /api/actors/update
 * Body: { actorID, name, age, dob }
 * Uses stored procedure: CALL update_actor(?, ?, ?, ?)
 */

router.put('/update', async (req, res) => {
  try {
    const { actorID, name, age, dob } = req.body;

    if (!actorID || !name || !age || !dob) {
      return res.status(400).json({ error: "All fields are required" });
    }

    await db.query("CALL update_actor(?, ?, ?, ?)", [actorID, name, age, dob]);

    res.status(200).json({ message: "Actor updated successfully" });
  } catch (err) {
    console.error("Failed to update actor:", err);
    res.status(500).json({ error: "Failed to update actor" });
  }
});

/**
 * DELETE /api/actors/delete
 * Accepts actorID from body or query (to be flexible with clients)
 * Uses stored procedure: CALL delete_actor(?)
 */

router.delete('/delete/:id', async (req, res) => {
  try {
    const actorID = req.params.id;

    if (!actorID) return res.status(400).json({ error: "actorID required" });

    await db.query("CALL delete_actor(?)", [Number(actorID)]);

    res.status(200).json({ message: "Actor deleted successfully" });
  } catch (err) {
    console.error("Failed to delete actor:", err);

    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      return res.status(400).json({
        error: "Cannot delete this actor because there are movies associated with them."
      });
    }

    res.status(500).json({ error: "Failed to delete actor" });
  }
});


module.exports = router;