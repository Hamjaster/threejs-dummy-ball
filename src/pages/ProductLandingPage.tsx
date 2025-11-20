import { useEffect, useEffectEvent, useState } from "react";
import ProductModel from "../components/ProductLP/ProductModel";
import gsap from "gsap/all";
import ProductContent from "../components/ProductLP/ProductContent";

interface ColorOption {
  name: string;
  value: string;
  themeColor: string;
  backgroundAccent: string;
}

const colorOptions: ColorOption[] = [
  {
    name: "Beige",
    value: "#F5F5DC",
    themeColor: "#D7B172", // taupe-brown
    backgroundAccent: "#E5E5E5", // reddish-brown,
      itemList : {
        bag : "#e6d3c4",
        strap : "#5e2b17",
        metal : "#d4c5b5"
      }
  },
  {
    name: "Dark Brown",
    value: "#2C1810",
    themeColor: "#774A37", // darker taupe
    backgroundAccent: "#79716C", // darker reddish-brown
    itemList : {
      bag : "#774a37",
      strap : "#503830",
      metal : "#d4c5b5"
    }
  },
  {
    name: "Light Blue",
    value: "#B0C4DE",
    themeColor: "#2F7393", // blue-gray taupe
    backgroundAccent: "#C1D6E3", // blue-gray accent,
    itemList : {
      bag : "#2f7393",
      strap : "#1d1b1b",
      metal : "#f2f2f2"
    }

  },
];

export default function ProductLandingPage() {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    colorOptions[0]
  );

  const handleColorChange = (color: ColorOption) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    gsap.to(".product-landing-page", {
      backgroundColor: selectedColor.backgroundAccent,
      duration: 1.5,
      ease: "power2.out",
    });
  }, [selectedColor]);

  return (
    <div
      style={{ backgroundColor: selectedColor.backgroundAccent }}
      className="min-h-screen flex overflow-hidden product-landing-page"
    >
      {/* Left Section - Product Information */}
      <ProductContent
        selectedColor={selectedColor}
        title="Earthy"
        subHeading="Khaki"
        bodyText="The brown color of the bag adds a touch of warmth and earthiness to its appearance, making it suitable for a wide range of occasions and outfits."
      />

      {/* Right Section - 3D Model and Color Swatches */}
      <div className="relative w-1/2 flex items-center justify-center">
        {/* Background Accent Shape */}

        {/* 3D Model Container */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
          <ProductModel color={selectedColor.value} />
        </div>

        {/* Color Swatches */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
          {colorOptions.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorChange(color)}
              className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 ${
                selectedColor.name === color.name
                  ? "border-white scale-110"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.value }}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
