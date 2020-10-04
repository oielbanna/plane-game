import React, { useRef, useEffect } from "react";
import { useFrame } from "react-three-fiber";
import { Colors } from "./Colors";

function Earth({ position, "rotation-speed": rotationSpeed }) {
  let r = useRef();
  useEffect(() => {
    r.current.geometry.vertices = r.current.geometry.vertices.map((v, i) => {
      return {
        y:
          v.y +
          Math.cos(Math.random() * Math.PI * 2) * (2 + Math.random() * 20),
        x:
          v.x +
          Math.cos(Math.random() * Math.PI * 2) * (2 + Math.random() * 20),
        z: v.z
      };
    });
  });
  useFrame(() => {
    r.current.rotation.y += rotationSpeed;
  });
  return (
    <group>
      <mesh
        ref={r}
        castShadow
        receiveShadow
        position={position}
        rotation-x="1.5"
      >
        {/* <cylinderGeometry attach="geometry" args={[200, 200, 500, 30, 10]} /> */}
        {/* <cylinderGeometry attach="geometry" args={[500, 500, 1000, 40, 10]} /> */}
        <sphereGeometry attach="geometry" args={[240, 40, 10]} />
        <meshPhongMaterial
          attach="material"
          color={Colors.blue}
          transparent
          flatShading
        />
      </mesh>
    </group>
  );
}

export default Earth;
