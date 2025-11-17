import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { DirectionalLight, DirectionalLightHelper, Mesh } from "three";
import { useEffect, useRef } from "react";
import gsap from "gsap";
// import Car from "./car";
function App() {
  const Scene = () => {
    const directionLight = useRef<DirectionalLight>(null!);
    const ballRef = useRef<Mesh>(null!);
    // useHelper(directionLight, DirectionalLightHelper, 1, "red");

    useEffect(() => {
      if (ballRef.current) {
        // move x
        gsap.to(ballRef.current.position, {
          x: 2,
          duration: 3,
          ease: "power2.out",
        });

        // bounce

        gsap.to(ballRef.current.position, {
          y: 1,
          duration: 1.5,
          ease: "bounce.out",
        });
      }
    }, [ballRef.current]);

    return (
      <>
        <directionalLight
          position={[0, 4, 2]}
          ref={directionLight}
          castShadow
          color={"white"}
        />
        {/* add spot light */}
        {/* Spotlight light */}
        <spotLight
          args={["green", 1.5, 7, Math.PI / 4, 0.4]}
          position={[-3, 1, 0]}
          castShadow
        />
        <ambientLight intensity={0.9} />{" "}
        {/* Ambient light is a light that
        illuminates all objects in the scene equally.
        {/* Point light decays with distance */}
        {/* <pointLight position={[0, 4, 2]} /> */}
        {/* setting the eyes a bit away from scene (the floor and ball ) */}
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          // maolarAngle={-Math.PI / 2}
        />
        {/* Floor Plane*/}
        <mesh
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
        {/* Car */}
        {/* <Car position={[-2, 0, 0]} /> */}
        {/* Ball */}
        <mesh ref={ballRef} position={[-2, 4, 0]} castShadow>
          {" "}
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color={"orange"}
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
      </>
    );
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <Canvas shadows>
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
