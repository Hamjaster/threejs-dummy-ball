import gsap from "gsap/all";
import { useEffect, useRef } from "react";

export default function AnimatedString() {
  const pathRef = useRef<SVGPathElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const handleMouseEnter = () => {
      console.log("Mouse entered the div");
    };

    const handleMouseMove = (dets: MouseEvent) => {
      console.log("Mouse moved in the div", dets, dets.offsetY);
      if (pathRef.current) {
        gsap.to(pathRef.current, {
          attr: { d: `M 10 100 Q ${dets.offsetX} ${dets.offsetY} 490 100` },
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      const finalPath = "M 10 100 Q 0 100 490 100";
      // move the path to final path
      if (pathRef.current) {
        gsap.to(pathRef.current, {
          attr: { d: finalPath },
          duration: 1.5,
          ease: "elastic.out(1.2,0.2)",
        });
      }
    };

    div.addEventListener("mouseenter", handleMouseEnter);
    div.addEventListener("mousemove", handleMouseMove);
    div.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      div.removeEventListener("mouseenter", handleMouseEnter);
      div.removeEventListener("mousemove", handleMouseEnter);
      div.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pathRef.current]);

  return (
    <div ref={divRef} className="bg-black w-max relative">
      <svg width={500} height={200}>
        <path
          stroke="white"
          fill="transparent"
          ref={pathRef}
          d="M 10 100 Q 250 100 490 100"
        />
      </svg>
    </div>
  );
}
