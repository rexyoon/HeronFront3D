import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { CarModel } from "./CarModel";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 5], fov: 45, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      style={{ width: "100%", height: "100%" }}
      className="bg-transparent">
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.0} />
      <directionalLight position={[-5, 4, -3]} intensity={0.6} />

     <group position-y={-0.5}>
        <CarModel url="/models/porsche.glb" />
      </group>

      <Environment preset="city" />
      <OrbitControls enableDamping enableZoom={false} />
    </Canvas>
  );
}
