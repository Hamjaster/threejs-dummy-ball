import gsap from "gsap";
import React, { useEffect, useRef } from "react";

export default function PinAnimation() {
  const boxRef = useRef(null!);
  const parentBoxRef = useRef(null!);

  useEffect(() => {
    if (boxRef.current) {
      gsap.to(boxRef.current, {
        transform: "translateX(-150%)",
        scrollTrigger: {
          //   trigger: parentBoxRef.current,
          trigger: boxRef.current,
          scroller: "body",
          // markers: true,
          start: "top 20%",
          end: "bottom 20%",
          scrub: 2,
          //   pin: true, // doesnt work, Idk why!!
          // pin is always used and it shall always point to the parent
        },
      });
    }
  }, [boxRef.current, parentBoxRef.current]);
  return (
    <div
      ref={parentBoxRef}
      className="h-screen w-full bg-blue-400 flex items-center  "
    >
      <div
        ref={boxRef}
        style={{ transform: "translateX(60%)" }}
        className="text-black uppercase w-full whitespace-nowrap  text-[35vw] font-extrabold"
      >
        Hamza
      </div>
    </div>
  );
}
