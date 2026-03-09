const express = require("express");
const router = express.Router();
const db = require("../db-connector");

router.post("/", async (req, res) => {
  try {
    await db.query("CALL load_moviesdb();");
    res.status(200).json({ message: "Database reset successfully" });
  } catch (err) {
    console.error("Failed to reset database:", err);
    res.status(500).json({ error: "Reset failed" });
  }
});

module.exports = router;