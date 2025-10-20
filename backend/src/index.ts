import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { categorizeEmail } from "./categorizer";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT || 5050);

app.use(cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET","POST"],
    credentials: true
}));
app.use(express.json());

// health
app.get("/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

// categorize an email
app.post("/categorize", (req, res) => {
    const { subject = "", body = "" } = req.body ?? {};
    const category = categorizeEmail(subject, body);
    res.json({ category });
});

// simulate “new email” flow
app.post("/new-email", (req, res) => {
    const { subject = "", body = "" } = req.body ?? {};
    const category = categorizeEmail(subject, body);
    // here you could notify Slack / webhook, etc.
    res.json({ ok: true, category, notified: false });
});

app.listen(PORT, () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
});
