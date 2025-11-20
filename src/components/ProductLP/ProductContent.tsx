import React, { useEffect, useRef } from "react";
import gsap from "gsap/all";
import GSAPTimeline from "gsap";

export default function ProductContent({
  selectedColor,
  title,
  subHeading,
  bodyText,
}: {
  selectedColor: any;
  title: string;
  subHeading: string;
  bodyText: string;
}) {
  useEffect(() => {
    gsap.fromTo(
      ".title h1",
      {
        y: 150,
      },
      {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.2,
      }
    );
    gsap.fromTo(
      ".sub-heading",
      {
        y: 150,
      },
      {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    );
    gsap.fromTo(
      ".body-text",
      {
        y: 150,
      },
      {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    );
    gsap.fromTo(
      ".shop-now-button",
      {
        opacity: 0,
        duration: 0.5,
        y: 150,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        backgroundColor: selectedColor.themeColor,
        ease: "power2.out",
      }
    );
  }, [selectedColor]);

  return (
    <div className="flex-1 product-content flex flex-col justify-between  pl-28 py-32 p-16  ">
      <div
        className={` ${
          selectedColor.name === "Dark Brown" ? "text-white" : "text-amber-900"
        }  flex flex-col space-y-5`}
      >
        {/* Brand Name */}
        <div className=" uppercase tracking-widest text-sm font-light">
          MISFIT.
        </div>

        {/* Main Heading */}
        <div className="flex overflow-hidden title flex-col space-y-2">
          <h1 className="text-7xl md:text-8xl font-bold  leading-tight">
            {title}
          </h1>
        </div>

        {/* Sub-heading */}
        <div className="flex items-center  overflow-hidden">
          <p className=" sub-heading text-3xl font-light">{subHeading}</p>
        </div>

        {/* Body Text */}
        <div className="flex items-center  overflow-hidden">
          <p className="body-text text-lg font-light max-w-lg leading-relaxed">
            {bodyText}
          </p>
        </div>
      </div>

      {/* Shop Now Button */}
      <div className="flex overflow-hidden w-max">
        <div className="  shop-now-button  text-lg font-semibold  px-8 py-4 rounded-xl cursor-pointer text-white font-">
          Shop Now
        </div>
      </div>
    </div>
  );
}
