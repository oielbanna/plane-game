import React, { useRef } from "react";
import "./styles.css";
import Sea from "./Sea.js";
import Plane from "./Plane";
import Sky from "./Sky";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });

const CameraControls = () => {
  const {
    camera,
    gl: { domElement }
  } = useThree();
  const controls = useRef();
  useFrame((state) => {
    controls.current.update();
  });
  return (
    <orbitControls
      // maxAzimuthAngle={Math.PI / 4}
      // maxPolarAngle={Math.PI / 2}
      // minAzimuthAngle={-Math.PI / 4}
      // minPolarAngle={0}
      // minZoom={40}
      // maxZoom={190}
      ref={controls}
      args={[camera, domElement]}
    />
  );
};

const rotationSpeed = 0.01;
const Scene = () => {
  // const { camera, gl } = useThree();

  // useFrame(({ camera, gl }) => {

  // });
  return (
    <Canvas camera={{ position: [0, 0, 190] }} shadowMap>
      <CameraControls />
      <ambientLight color={0xdc8874} intensity={0.7} />
      <hemisphereLight
        skyColor={0xaaaaaa}
        groundColor={0x000000}
        intensity={0.42}
      />
      <directionalLight
        castShadow
        color="white"
        intensity={0.67}
        position={[90, 300, -50]}
        shadow-camera-near={1}
        shadow-camera-far={1000}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-camera-left={-100}
        shadow-camera-right={100}
      />
      <pointLight intensity={0.3} position={[140, -25, 0]} />
      <fog attach="fog" args={[0xf7d9aa, 20, 550]} />
      <Sea position={[0, -300, 0]} rotation-speed={rotationSpeed} />
      <Plane scale={[0.25, 0.25, 0.25]} position={{ x: -5, y: 0, z: 0 }} />
      <Sky position={[-5, -250, -100]} rotation-speed={rotationSpeed} />
    </Canvas>
  );
};

export default Scene;
