import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  url: string;
};

export function CarModel({ url }: Props) {
  const { scene } = useGLTF(url);

  const prepared = useMemo(() => {
    const clone = scene.clone(true);

    // 1️⃣ 바운딩 박스 계산
    const box = new THREE.Box3().setFromObject(clone);

    // 2️⃣ 크기 계산
    const size = new THREE.Vector3();
    box.getSize(size);

    // 3️⃣ 자동 스케일 (차 길이를 약 4.5 유닛로 맞춤)
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 4.5;
    const scale = maxDim > 0 ? targetSize / maxDim : 1;
    clone.scale.setScalar(scale);

    // 4️⃣ 다시 바운딩 계산 (스케일 적용 후)
    const boxScaled = new THREE.Box3().setFromObject(clone);

    // 5️⃣ 중심 정렬
    const center = new THREE.Vector3();
    boxScaled.getCenter(center);
    clone.position.sub(center);

    // 6️⃣ 바닥에 정확히 올려놓기 (y = 0)
    // ❗ getMin() ❌ → box.min.y ⭕
    clone.position.y -= boxScaled.min.y;

    return clone;
  }, [scene]);

  return <primitive object={prepared} />;
}

// 프리로드
useGLTF.preload("/models/kia_stinger.glb");
