"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "./config";

type Health = { ok: boolean; ts: number };
type CategorizeResponse = { category: string };
type NewEmailResponse = { ok: boolean; category: string; notified: boolean };

export default function Home() {
    const [status, setStatus] = useState<"checking"|"ok"|"fail">("checking");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // check backend
    useEffect(() => {
        (async () => {
            try {
                const r = await fetch(`${API_BASE}/health`, { cache: "no-store" });
                setStatus(r.ok ? "ok" : "fail");
            } catch {
                setStatus("fail");
            }
        })();
    }, []);

    const handleCategorize = async () => {
        setMessage(null);
        setCategory(null);
        try {
            const r = await fetch(`${API_BASE}/categorize`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, body })
            });
            if (!r.ok) throw new Error("Failed");
            const data: CategorizeResponse = await r.json();
            setCategory(data.category);
        } catch {
            setMessage("❌ Categorize failed");
        }
    };

    const handleNewEmail = async () => {
        setMessage(null);
        try {
            const r = await fetch(`${API_BASE}/new-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, body })
            });
            if (!r.ok) throw new Error("Failed");
            const data: NewEmailResponse = await r.json();
            setMessage(`✅ Saved as "${data.category}" (notified: ${data.notified})`);
        } catch {
            setMessage("❌ Save failed");
        }
    };

    return (
        <main style={{ fontFamily: "sans-serif", padding: 16, maxWidth: 640 }}>
            <h1>🚀 ReachInbox Onebox Frontend</h1>
            <p>
                Status:{" "}
                {status === "checking" ? "⏳ Connecting to backend..." :
                    status === "ok" ? "✅ Backend reachable" :
                        "❌ Backend not reachable"}
            </p>

            <div style={{ display: "grid", gap: 8, marginTop: 16 }}>
                <label>Subject</label>
                <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
                    placeholder="e.g. Invoice for September"
                />

                <label>Body</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6, height: 120 }}
                    placeholder="Type your email body..."
                />

                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button onClick={handleCategorize} style={{ padding: "8px 12px" }}>
                        Check category
                    </button>
                    <button onClick={handleNewEmail} style={{ padding: "8px 12px" }}>
                        Save new email
                    </button>
                </div>

                {category && <div>📂 Category: <b>{category}</b></div>}
                {message && <div>{message}</div>}
            </div>
        </main>
    );
}

