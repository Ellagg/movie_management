const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 7689; // choose any port between 1025-65535

app.use(cors({ origin: "*" }));
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Serve React app for all other routes
// app.get((req, res, next) => {
//   const indexPath = path.join(__dirname, "build", "index.html");
//   if (fs.existsSync(indexPath)) {
//     res.sendFile(indexPath);
//   } else {
//     next(); // fallback if build/index.html doesn't exist
//   }
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/delete', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/update', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://classwork.engr.oregonstate.edu:${PORT}`);
});