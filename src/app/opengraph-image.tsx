import { ImageResponse } from "next/og";

export const alt = "Fileio - File Manager, Document Viewer & PDF Scanner for Android";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", background: "#eff6ff", padding: 72, fontFamily: "sans-serif" }}><div style={{ display: "flex", flex: 1, flexDirection: "column", justifyContent: "space-between", borderRadius: 40, padding: 64, background: "white", boxShadow: "0 30px 80px rgba(30,64,175,.14)" }}><div style={{ display: "flex", alignItems: "center", gap: 20 }}><div style={{ display: "flex", width: 64, height: 64, borderRadius: 18, background: "#2563eb", color: "white", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 800 }}>F</div><span style={{ fontSize: 36, color: "#0f172a", fontWeight: 700 }}>Fileio</span></div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 64, lineHeight: 1.08, letterSpacing: -3, color: "#0f172a", fontWeight: 800 }}>Your files, simple and clear.</div><div style={{ marginTop: 24, fontSize: 27, color: "#475569" }}>File manager · Document viewer · PDF scanner for Android</div></div></div></div>, size);
}
