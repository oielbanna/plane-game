import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Colors } from "./Colors";

const n = 20;
var stepAngle = (Math.PI * 2) / n;

export default function Sky({ position, "rotation-speed": rotationSpeed }) {
  const r = useRef();
  useFrame(() => {
    r.current.rotation.z += rotationSpeed;
  });
  return (
    <group position={position} ref={r}>
      {new Array(n).fill(0).map((_, i) => {
        let angle = stepAngle * i;
        // distance from center
        let h = 300 + Math.random() * 80;
        let position = [
          Math.cos(angle) * h,
          Math.sin(angle) * h,
          Math.random() * 100
        ];
        return <Cloud key={i} position={position} />;
      })}
    </group>
  );
}

function Cloud({ position, rotationZ }) {
  let nBlocs = 2 + Math.floor(Math.random() * 3);
  return (
    <group position={position} rotation-z={rotationZ}>
      {new Array(nBlocs).fill(0).map((_, i) => {
        let pos = [i * 15, Math.random() * 20, Math.random() * 20];
        let rotationX = Math.random() * Math.PI * 2;
        let rotationY = Math.random() * Math.PI * 2;
        let s = 0.4 + Math.random() * 0.9;
        return (
          <mesh
            receiveShadow
            position={pos}
            rotation-x={rotationX}
            rotation-y={rotationY}
            scale={[s, s, s]}
            key={i}
          >
            <boxGeometry
              attach="geometry"
              args={[20, 20, 20, 1, 1, 1]}
            ></boxGeometry>
            <meshPhongMaterial
              attach="material"
              color={Colors.cloudWhite}
              flatShading
            />
          </mesh>
        );
      })}
    </group>
  );
}
