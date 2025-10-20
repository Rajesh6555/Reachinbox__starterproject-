export function categorizeEmail(subject: string, body: string) {
    const text = `${subject} ${body}`.toLowerCase();

    if (text.includes("invoice") || text.includes("payment") || text.includes("bill")) return "billing";
    if (text.includes("meeting") || text.includes("schedule") || text.includes("calendar")) return "calendar";
    if (text.includes("job") || text.includes("resume") || text.includes("interview")) return "recruiting";
    if (text.includes("bug") || text.includes("issue") || text.includes("error")) return "support";
    return "general";
}
