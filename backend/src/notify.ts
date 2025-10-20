import "dotenv/config";

const slackUrl = process.env.SLACK_WEBHOOK_URL || "";
const interestedWebhook = process.env.INTERESTED_WEBHOOK_URL || "";

export async function notifySlack(text: string) {
    if (!slackUrl) return { ok: false, skipped: true, reason: "No SLACK_WEBHOOK_URL" };
    const resp = await fetch(slackUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text }),
    });
    return { ok: resp.ok, status: resp.status };
}

export async function triggerWebhook(payload: unknown) {
    if (!interestedWebhook) return { ok: false, skipped: true, reason: "No INTERESTED_WEBHOOK_URL" };
    const resp = await fetch(interestedWebhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
    });
    return { ok: resp.ok, status: resp.status };
}
