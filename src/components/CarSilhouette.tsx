import { useMemo } from "react";
import * as THREE from "three";

export function CarSilhouette() {
  const geometry = useMemo(() => {
    // 간단한 자동차 옆모습 실루엣 (2D Shape -> Extrude)
    const s = new THREE.Shape();

    // 바닥 라인
    s.moveTo(-2.1, 0.2);
    s.lineTo(2.1, 0.2);

    // 앞 범퍼/보닛
    s.lineTo(2.2, 0.35);
    s.lineTo(1.7, 0.55);

    // 지붕
    s.lineTo(0.9, 0.95);
    s.lineTo(-0.7, 0.95);

    // 뒷유리/트렁크
    s.lineTo(-1.2, 0.7);
    s.lineTo(-2.0, 0.55);

    // 다시 바닥으로
    s.lineTo(-2.2, 0.35);
    s.lineTo(-2.1, 0.2);

    const extrude = new THREE.ExtrudeGeometry(s, {
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
      curveSegments: 32,
    });

    extrude.center();
    return extrude;
  }, []);

  return (
    <group position={[0, 0.1, 0]}>
      {/* 차 본체 (거의 검정) */}
      <mesh geometry={geometry} rotation={[0, -0.35, 0]}>
        <meshStandardMaterial
          color={"#ffffffff"}
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>

      {/* 바닥에 아주 약한 반사 느낌 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={"#07070b"} roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}
