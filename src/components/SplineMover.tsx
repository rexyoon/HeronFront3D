import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Line, Html } from "@react-three/drei";

export function SplineMover() {
  const meshRef = useRef<THREE.Mesh>(null);

  // 진행 속도 조절
  const [speed, setSpeed] = useState(0.18); // (0.05~0.5 정도로 놀아봐)

  // 스플라인 경로 만들기 (원하는 포인트로 바꾸면 됨)
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(-4, 0.2, 1.2),
        new THREE.Vector3(-2, 1.2, -1.5),
        new THREE.Vector3(0, 0.6, -2.2),
        new THREE.Vector3(2.2, 1.1, -0.4),
        new THREE.Vector3(4, 0.3, 1.2),
      ],
      false,
      "catmullrom",
      0.6
    );
  }, []);

  // 선으로 경로 시각화
  const points = useMemo(() => curve.getPoints(200), [curve]);

  // 시간 누적
  const tRef = useRef(0);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // t: 0~1 반복
    tRef.current = (tRef.current + delta * speed) % 1;

    // 위치
    const pos = curve.getPointAt(tRef.current);
    mesh.position.copy(pos);

    // 진행 방향으로 바라보기 (살짝 앞쪽 점을 lookAt)
    const aheadT = (tRef.current + 0.01) % 1;
    const ahead = curve.getPointAt(aheadT);
    mesh.lookAt(ahead);
  });

  return (
    <group>
      {/* 경로 라인 */}
      <Line points={points} lineWidth={2} />

      {/* 움직이는 오브젝트 */}
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial metalness={0.2} roughness={0.3} />
      </mesh>

      {/* 간단한 속도 조절 UI (3D 위에 HTML) */}
      <Html position={[0, 2.4, 0]} center>
        <div
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            background: "rgba(20,20,26,0.7)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "white",
            minWidth: 220,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Speed</div>
          <input
            type="range"
            min={0.05}
            max={0.5}
            step={0.01}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            style={{ width: "100%" }}
          />
          <div style={{ opacity: 0.8, fontSize: 12, marginTop: 6 }}>
            {speed.toFixed(2)}
          </div>
        </div>
      </Html>
    </group>
  );
}
