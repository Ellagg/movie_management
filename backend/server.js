require("dotenv").config(); // import .env file

const db = require('./db-connector');

const MY_ONID = process.env.USER_ONID;

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT_NUMBER;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// API route example
app.get('/api/hello', (req, res) => {
    res.json({ message: "Hello!" });
});

app.use("/api/actors", require("./routes/actorsRoutes"))

app.use("/api/directors", require("./routes/directorsRoutes"))

app.use("/api/genres", require("./routes/genresRoutes"))

app.use("/api/movies", require("./routes/moviesRoutes"))

const os = require("os")
const hostname = os.hostname()
app.listen(process.env.PORT_NUMBER, () => {
    console.log(`Backend server running on http://${hostname}:${process.env.PORT_NUMBER}`);
});