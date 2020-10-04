import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "react-three-fiber";
import { Colors } from "./Colors";

function normalize(v, vmin, vmax, tmin, tmax) {
  var nv = Math.max(Math.min(v, vmax), vmin);
  var dv = vmax - vmin;
  var pc = (nv - vmin) / dv;
  var dt = tmax - tmin;
  var tv = tmin + pc * dt;
  return tv;
}

function Plane({ position, scale }) {
  let plane = useRef();
  let { x, z } = position;
  const [y, setY] = useState(0);

  useFrame(({ mouse }) => {
    const targetY = normalize(mouse.y, -.75, 1.75, -50, 105);
    const newY = y + (targetY - y) * 0.1;
    setY(newY);
    plane.current.rotation.set((y - targetY) * 0.0064, 0, (targetY - y) * 0.0064);
  });
  return (
    <group ref={plane} position={[x, y, z]} scale={scale} >
      <CockPit />
      <Engine />
      <Tail />
      <Wing />
      <Propeller />
    </group>
  );
}

export function CockPit() {
  let r = useRef();
  useEffect(() => {
    r.current.geometry.vertices[4].y -= 10;
    r.current.geometry.vertices[4].z += 20;
    r.current.geometry.vertices[5].y -= 10;
    r.current.geometry.vertices[5].z -= 20;
    r.current.geometry.vertices[6].y += 30;
    r.current.geometry.vertices[6].z += 20;
    r.current.geometry.vertices[7].y += 30;
    r.current.geometry.vertices[7].z -= 20;
  }, []);

  return (
    <mesh castShadow receiveShadow ref={r}>
      <boxGeometry attach="geometry" args={[60, 50, 50, 1, 1, 1]}></boxGeometry>
      <meshPhongMaterial attach="material" color={Colors.red} flatShading />
    </mesh>
  );
}

function Engine() {
  return (
    <mesh position-x={40} castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[20, 50, 50, 1, 1, 1]}></boxGeometry>
      <meshPhongMaterial attach="material" color={Colors.white} flatShading />
    </mesh>
  );
}

function Tail() {
  return (
    <mesh position={[-35, 25, 0]} castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[15, 20, 5, 1, 1, 1]}></boxGeometry>
      <meshPhongMaterial attach="material" color={Colors.red} flatShading />
    </mesh>
  );
}

function Wing() {
  return (
    <mesh castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[40, 8, 150, 1, 1, 1]}></boxGeometry>
      <meshPhongMaterial attach="material" color={Colors.red} flatShading />
    </mesh>
  );
}

function Propeller() {
  return (
    <mesh position-x={50} castShadow receiveShadow>
      <boxGeometry attach="geometry" args={[20, 10, 10, 1, 1, 1]}></boxGeometry>
      <meshPhongMaterial attach="material" color={Colors.brown} flatShading />
      <Blades />
    </mesh>
  );
}

function Blades() {
  let r = useRef();
  useFrame(() => {
    r.current.rotation.x += 0.8;
  });

  return (
    <mesh position-x={6} castShadow receiveShadow ref={r}>
      <boxGeometry attach="geometry" args={[1, 100, 13, 1, 1, 1]}></boxGeometry>
      <meshPhongMaterial
        attach="material"
        color={Colors.brownDark}
        flatShading
      />
    </mesh>
  );
}
export default Plane;
