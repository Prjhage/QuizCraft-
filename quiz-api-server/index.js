const express = require("express");
const cors = require("cors");
const questions = require("./questions");
const { shuffle, pick } = require("./utils");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/questions/:subject", (req, res) => {
    const subject = req.params.subject.toLowerCase();
    console.log("📩 Request received for:", subject);
    const exclude = req.body.exclude || [];

    const pool = questions[subject];
    if (!pool) {
        console.log("❌ No questions found for:", subject);
        return res
            .status(404)
            .json({ error: "No questions found for this subject" });
    }
    const filtered = pool.filter((q) => !exclude.includes(q.id));
    const selected = pick(shuffle(filtered.length >= 20 ? filtered : pool), 20);

    res.json(selected);
});

app.listen(PORT, () => {
    console.log(`✅ Quiz API running at http://localhost:${PORT}`);
});