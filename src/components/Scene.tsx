import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { CarModel } from "./CarModel";

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 5], fov: 45, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      style={{ background: "#050508" }}
    >
      {/* 기본 라이트 */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} />
      <directionalLight position={[-5, 4, -3]} intensity={0.6} />

      {/* 차 모델 */}
      <CarModel url="/models/kia_stinger.glb" />

      {/* 배경/반사감(선택) */}
      <Environment preset="city" />

      {/* 테스트용 카메라 컨트롤 (나중에 스크롤 연출할 때 제거 가능) */}
      <OrbitControls enableDamping />
    </Canvas>
  );
}
