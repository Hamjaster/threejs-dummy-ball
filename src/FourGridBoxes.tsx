import React from "react";
import gsap from "gsap";
import { useEffect } from "react";

export default function FourGridBoxes() {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section",
        scroller: "body",
        start: "top 50%",
        end: "top 0",
        // markers: true,
        scrub: 2,
      },
    });
    tl.fromTo(
      ".elem.line-1.right",
      {
        x: -600,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      "line1"
    );
    tl.fromTo(
      ".elem.line-1.left",
      {
        x: 600,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      "line1"
    );
    tl.fromTo(
      ".elem.line-2.right",
      {
        x: 600,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      "line2"
    );
    tl.fromTo(
      ".elem.line-2.left",
      {
        x: -600,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      "line2"
    );
  }, []);
  return (
    <div className="section border border-purple-700 w-full gap-16 grid grid-cols-2 grid-rows-2 p-24 mb-52">
      <div className="elem line-1 right w-96 h-64 bg-red-500">Box 1</div>
      <div className="elem line-1 left w-96 h-64 bg-blue-500">Box 2</div>
      <div className="elem w-96 line-2 left h-64 bg-green-500">Box 3</div>
      <div className="elem w-96 line-2 right h-64 bg-yellow-500">Box 4</div>
    </div>
  );
}
