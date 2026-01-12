import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import { SplineMover } from "./SplineMover";

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 7], fov: 55, near: 0.1, far: 1000 }}
      dpr={[1, 2]}
    >
      {/* 라이트 */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.9} />

      {/* 바닥 느낌 */}
      <Grid
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.5}
        sectionSize={2.5}
        sectionThickness={1}
        fadeDistance={25}
        fadeStrength={1}
        infiniteGrid
      />

      {/* 스플라인 따라 움직이는 오브젝트 */}
      <SplineMover />

      {/* 환경 */}
      <Environment preset="city" />

      {/* 카메라 컨트롤(테스트용) */}
      <OrbitControls enableDamping />
    </Canvas>
  );
}
