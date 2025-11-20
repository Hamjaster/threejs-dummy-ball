import { Canvas } from "@react-three/fiber";
import React from "react";
import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { DirectionalLight, DirectionalLightHelper, Mesh } from "three";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { BagModel } from "../Bag.jsx";

export default function ProductModel() {
  const Scene = () => {
    const directionLight = useRef<DirectionalLight>(null!);
    const bagRef = useRef<Mesh>(null!);

    useEffect(() => {
      
    }, [])
    

    return (
      <>
        model here guys
        <directionalLight
          position={[0, 4, 2]}
          ref={directionLight}
          castShadow
          color={"white"}
        />
        <ambientLight intensity={2} />
        <PerspectiveCamera makeDefault position={[0, 0, 210]} />
        {/* <mesh ref={ballRef} position={[0, 0, 0]} castShadow>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={"orange"} />
          </mesh> */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          autoRotate={true}
          autoRotateSpeed={2}
        />
        <BagModel ref = {bagRef} position={[0, -20, 0]} scale={1} />
      </>
    );
  };

  return (
    <>
      <Canvas>
        <Scene /> {/* Scene is the function that returns the scene */}
      </Canvas>
    </>
  );
}
