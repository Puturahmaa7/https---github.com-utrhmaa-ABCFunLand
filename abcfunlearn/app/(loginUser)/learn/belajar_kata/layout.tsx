export default function BelajarKataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          backgroundColor: "#7ED957",
          margin: "20px",
          padding: "20px",
          borderRadius: "40px",
          textAlign: "center",
          fontSize: "36px",
          fontWeight: "800",
          flexShrink: 0,
        }}
      >
        Belajar Kata
      </div>

      {/* CONTENT */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
