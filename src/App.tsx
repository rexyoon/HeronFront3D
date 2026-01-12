import { Scene } from "./components/Scene";

export default function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: 16,
          left: 16,
          display: "flex",
          gap: 8,
          alignItems: "center",
          padding: "10px 12px",
          borderRadius: 12,
          background: "rgba(20,20,26,0.6)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ fontWeight: 700 }}>WAY</div>
        <div style={{ opacity: 0.8, fontSize: 13 }}>
          React Three Fiber + Spline Path
        </div>
      </div>

      <Scene />
    </div>
  );
}
