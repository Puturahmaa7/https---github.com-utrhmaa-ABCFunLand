"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function DetailSukuKataPage() {
  const params = useSearchParams();
  const router = useRouter();

  const daftarSuku = ["BA", "BI", "BU", "BE", "BO"];

  const sukuParam = params.get("suku") ?? daftarSuku[0];
  const indexSuku = daftarSuku.indexOf(sukuParam);

  const sukuSebelumnya =
    indexSuku > 0 ? daftarSuku[indexSuku - 1] : null;

  const sukuSelanjutnya =
    indexSuku < daftarSuku.length - 1
      ? daftarSuku[indexSuku + 1]
      : null;

  const pindahSuku = (suku: string) => {
    router.push(
      `/learn/belajar_suku_kata/detail_suku_kata?suku=${suku}`
    );
  };

  return (
    <div
      style={{
        marginTop: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
      }}
    >
      {/* PANAH + SUKU KATA */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
        }}
      >
        {/* PANAH KIRI */}
        {sukuSebelumnya ? (
          <button onClick={() => pindahSuku(sukuSebelumnya)} style={panahStyle}>
            ◀
          </button>
        ) : (
          <div style={{ width: "70px" }} />
        )}

        {/* SUKU KATA */}
        <div
          style={{
            backgroundColor: "#7ED957",
            width: "320px",
            height: "200px",
            borderRadius: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "96px",
            fontWeight: "800",
            userSelect: "none",
          }}
        >
          {sukuParam}
        </div>

        {/* PANAH KANAN */}
        {sukuSelanjutnya ? (
          <button onClick={() => pindahSuku(sukuSelanjutnya)} style={panahStyle}>
            ▶
          </button>
        ) : (
          <div style={{ width: "70px" }} />
        )}
      </div>
    </div>
  );
}

const panahStyle: React.CSSProperties = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  backgroundColor: "#666",
  color: "#fff",
  fontSize: "28px",
  border: "none",
  cursor: "pointer",
};
