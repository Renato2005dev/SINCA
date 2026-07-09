import { useEffect, useState } from "react";

export default function ReadingMask() {
  const [y, setY] = useState(200);

  useEffect(() => {
    const handleMove = (e) => {
      setY(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      {/* zona arriba oscura */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: y - 80,
          background: "rgba(0,0,0,0.7)",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />

      {/* zona abajo oscura */}
      <div
        style={{
          position: "fixed",
          top: y + 80,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.7)",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
    </>
  );
}