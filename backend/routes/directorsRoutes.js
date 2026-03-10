const express = require("express")
const router = express.Router()
const db = require("../db-connector")

router.get('/', async (req, res) => {
    try{
      const querySelect = 'CALL list_directors'

      const [rows] = await db.query(querySelect);

      res.status(200).send(rows[0]);
    } catch (err) {
      console.error("Failed to get directors: ", err);

      res.status(500).json({ error: "Failed to fetch directors" });
    }
});
router.post('/create', async (req, res) => {
    try{
        const { name, age, dob } = req.body;

        if (!name || !age || !dob) {
            return res.status(400).json({ error: "All fields are required" });
        }

        await db.query("CALL add_director(?, ?, ?)", [name, age, dob]);

        res.status(201).json({ message: "Director created successfully" });

    } catch (err) {
        console.error("Failed to create director:", err);
        
        res.status(500).json({ error: "Failed to create director" });
    }
});
router.delete('/delete/:id', async (req, res) => {
    try{
        const directorID = req.params.id;

        if (!directorID) return res.status(400).json({ error: "directorID required" });

        await db.query("CALL delete_director(?)", [Number(directorID)]);

        res.status(200).json({ message: "Director deleted successfully" });
    } catch (err) {
        console.error("Failed to delete director:", err);

        if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
            return res.status(400).json({
                error: "Cannot delete this director because there are movies associated with them."
            });
        }

        res.status(500).json({ error: "Failed to delete director" });
    }
});
router.put('/update', async (req, res) => {
    try{
        const { directorID, name, age, dob } = req.body;

        if (!directorID || !name || !age || !dob) {
            return res.status(400).json({ error: "All fields are required" });
        }

        await db.query("CALL update_director(?, ?, ?, ?)", [directorID, name, age, dob]);

        res.status(200).json({ message: "Director updated successfully" });
    } catch (err) {
        console.error("Failed to update director:", err);

        res.status(500).json({ error: "Failed to update director" });
    }
});

module.exports = router;