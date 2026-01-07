export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <header
        style={{
          background: "#7ED957",
          padding: "16px 48px",
          borderRadius: "16px",
          display: "inline-block",
          fontSize: "28px",
          fontWeight: 800,
        }}
      >
        BELAJAR SUKU KATA
      </header>

      <main style={{ marginTop: "50px" }}>
        {children}
      </main>
    </div>
  );
}
