const express = require("express");
const cors = require("cors");
const path = require("path");
const questions = require("./questions");
const { shuffle, pick } = require("./utils");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.post("/api/questions/:subject", (req, res) => {
    const subject = req.params.subject.toLowerCase();
    const exclude = req.body.exclude || [];
    const pool = questions[subject];

    if (!pool) {
        return res.status(404).json({ error: "No questions found for this subject" });
    }

    const filtered = pool.filter((q) => !exclude.includes(q.id));
    let source = filtered.length === 0 ? pool : filtered;

    const selected = pick(shuffle(source), 20);
    res.json(selected);
});

// Serve Frontend Static Files
app.use(express.static(path.join(__dirname, "../dist")));

// SPA Catch-all
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`✅ Server running at port ${PORT}`);
});