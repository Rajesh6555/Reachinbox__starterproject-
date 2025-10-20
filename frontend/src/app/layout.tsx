export const metadata = {
    title: "ReachInbox Onebox Frontend"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body style={{ fontFamily: "system-ui, Arial", padding: 16 }}>{children}</body>
        </html>
    );
}
