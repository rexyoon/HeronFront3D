import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ScreenQuad } from "@react-three/drei";

type Props = {
  radius?: number;   // 구멍 크기 (0~1, 화면 UV 기준)
  softness?: number; // 가장자리 부드러움
};

export function CursorMask({ radius = 0.16, softness = 0.08 }: Props) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse } = useThree(); // NDC: x,y in [-1,1]

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uMouse: { value: new THREE.Vector2(0.5, 0.5) }, // UV
        uRadius: { value: radius },
        uSoftness: { value: softness },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;

        uniform vec2 uMouse;      // 0~1 UV
        uniform float uRadius;
        uniform float uSoftness;

        // 간단한 노이즈(살짝 질감)
        float hash(vec2 p){
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 78.233);
          return fract(p.x * p.y);
        }

        void main() {
          float d = distance(vUv, uMouse);

          // hole: inside => alpha 0, outside => alpha 1
          float edge = smoothstep(uRadius, uRadius + uSoftness, d);

          // 아주 미세한 노이즈로 무드 추가
          float n = (hash(vUv * 300.0) - 0.5) * 0.05;

          vec3 overlayColor = vec3(0.0); // 검정
          float alpha = clamp(edge + n, 0.0, 1.0);

          gl_FragColor = vec4(overlayColor, alpha);
        }
      `,
    });
  }, [radius, softness]);

  useFrame(() => {
    const m = matRef.current;
    if (!m) return;

    // NDC [-1,1] -> UV [0,1]
    const ux = mouse.x * 0.5 + 0.5;
    const uy = mouse.y * 0.5 + 0.5;

    m.uniforms.uMouse.value.set(ux, uy);
  });

  return (
    <ScreenQuad>
      <primitive ref={matRef} object={material} attach="material" />
    </ScreenQuad>
  );
}
