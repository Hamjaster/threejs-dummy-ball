import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { DirectionalLight, DirectionalLightHelper, Mesh } from "three";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import PinAnimation from "./PinAnimation";
import AnimatedString from "./AnimatedString";
import Sidebar from "./Sidebar";
// import Car from "./car";

function App() {
  gsap.registerPlugin(ScrollTrigger);
  const boxRef = useRef(null!);
  const circleRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // const Scene = () => {
  //   const directionLight = useRef<DirectionalLight>(null!);
  //   const ballRef = useRef<Mesh>(null!);
  //   // useHelper(directionLight, DirectionalLightHelper, 1, "red");

  // useEffect(() => {
  //   if (boxRef.current) {
  //     gsap.from(boxRef.current, {
  //       // opacity: 0,
  //       duration: 3,
  //       rotate: 720,
  //       scrollTrigger: {
  //         trigger: boxRef.current,
  //         markers: true,
  //         // start: "top 50%",
  //         // end: "bottom bottom",
  //         // scrub : true,
  //       },
  //     });
  //   }
  // }, [boxRef.current]);

  // useEffect(() => {
  //   if (ballRef.current) {
  //     // move x
  //     gsap.to(ballRef.current.position, {
  //       x: 2,
  //       duration: 3,
  //       ease: "power2.out",
  //     });

  //     // bounce

  //     gsap.to(ballRef.current.position, {
  //       y: 1,
  //       duration: 1.5,
  //       ease: "bounce.out",
  //     });
  //   }
  // }, [ballRef.current]);

  //   return (
  //     <>
  //       <directionalLight
  //         position={[0, 4, 2]}
  //         ref={directionLight}
  //         castShadow
  //         color={"white"}
  //       />
  //       {/* add spot light */}
  //       {/* Spotlight light */}
  //       <spotLight
  //         args={["green", 1.5, 7, Math.PI / 4, 0.4]}
  //         position={[-3, 1, 0]}
  //         castShadow
  //       />
  //       <ambientLight intensity={0.5} />{" "}
  //       {/* Ambient light is a light that
  //       illuminates all objects in the scene equally.
  //       {/* Point light decays with distance */}
  //       {/* <pointLight position={[0, 4, 2]} /> */}
  //       {/* setting the eyes a bit away from scene (the floor and ball ) */}
  //       <PerspectiveCamera makeDefault position={[0, 5, 10]} />
  //       <OrbitControls
  //         enableZoom={true}
  //         enablePan={false}
  //         // maolarAngle={-Math.PI / 2}
  //       />
  //       {/* Floor Plane*/}
  //       <mesh
  //         position={[0, 0, 0]}
  //         rotation={[-Math.PI / 2, 0, 0]}
  //         receiveShadow
  //       >
  //         <planeGeometry args={[100, 100]} />
  //         <meshStandardMaterial color={"green"} />
  //       </mesh>
  //       {/* Car */}
  //       {/* <Car position={[-2, 0, 0]} /> */}
  //       {/* Ball */}
  //       <mesh ref={ballRef} position={[-2, 4, 0]} castShadow>
  //         {" "}
  //         <sphereGeometry args={[1, 32, 32]} />
  //         <meshStandardMaterial
  //           color={"orange"}
  //           metalness={0.5}
  //           roughness={0.5}
  //         />
  //       </mesh>
  //     </>
  //   );
  // };

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    if (boxRef.current) {
      gsap.fromTo(
        boxRef.current,
        {
          opacity: 0,
          rotate: 720,
        },
        {
          opacity: 1,
          rotate: 0,
          scrollTrigger: {
            trigger: boxRef.current,
            // markers: true,
            start: "top 50%",
            // end: "bottom bottom",
            scrub: 2,
          },
          duration: 6,
        }
      );
    }

    const handleMouseMove = (dets: MouseEvent) => {
      console.log("Mouse moved in the window", dets);
      if (circleRef.current) {
        gsap.to(circleRef.current, {
          x: dets.x,
          y: dets.offsetY,
        });
      }
    };

    main.addEventListener("mousemove", handleMouseMove);
    imageRef.current &&
      imageRef.current.addEventListener("mousemove", (dets) => {
        gsap.to(circleRef.current, {
          scale: 4,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    imageRef.current &&
      imageRef.current.addEventListener("mouseleave", (dets) => {
        gsap.to(circleRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    return () => {
      main.removeEventListener("mousemove", handleMouseMove);
    };
  }, [circleRef.current, mainRef.current]);

  return (
    <div className="overflow-x-hidden ">
      <Sidebar />
      <div className=" text-black items-center flex flex-col space-y-6  justify-center">
        <div className=" w-full h-screen border-2 border-black  bg-red-500"></div>
        <div className="relative w-full h-[200vh] border-2 mt-11 border-black  bg-green-500">
          <div
            ref={boxRef}
            className=" -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2  w-56 h-56 border-2 mt-11 bg-black"
          ></div>
        </div>
      </div>
      <div className="mb-[30vh]">
        <PinAnimation />
      </div>
      <div className="mb-[100vh]">
        <div className="text-3xl font-semibold my-4">
          PLAY WITH THIS Guitar animated string : -
        </div>
        <AnimatedString />
      </div>
      <div>Following mouse cursor :</div>
      <div ref={mainRef} className="h-screen bg-green-400">
        {/* cursor circle */}
        {/* 
        https://www.youtube.com/watch?v=Sc64ZiW2xPA&list=PLbtI3_MArDOnIIJxB6xFtpnhM0wTwz0x6&index=10
        wathc this video : 2:43:00 to fix when the cursor jitters
        */}
        <div
          ref={circleRef}
          className=" w-40 rounded-full pointer-events-none z-10"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "white",
            mixBlendMode: "difference",
            // boxShadow:
            //   "0 0 40px 20px rgba(255, 255, 255, 0.8), 0 0 80px 40px rgba(255, 255, 255, 0.5)",
            filter: "blur(1px)",
          }}
        ></div>
        <img ref={imageRef} src="https://picsum.photos/2000/700" alt="" />
      </div>
    </div>
  );
}

export default App;
