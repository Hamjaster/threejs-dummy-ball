import { useState, useRef, useEffect } from "react";
import gsap from "gsap/all";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      sidebarRef.current,
      { x: "100%" },
      { x: 0, duration: 0.5, ease: "power2.out" }
    );
    tl.fromTo(
      ".nav-item",
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.3,
        duration: 0.2,
        ease: "power2.out",
      }
    );
    tl.fromTo(
      ".close",
      {
        opacity: 0,
      },
      {
        opacity: 1,

        duration: 0.2,
        ease: "power2.out",
      }
    );
    tl.pause();

    buttonRef.current &&
      buttonRef.current.addEventListener("click", () => {
        tl.reverse();
      });
    return () => {
      buttonRef.current &&
        buttonRef.current.removeEventListener("click", () => {
          tl.reverse();
        });
    };
  }, [isOpen]);

  const menuItems = ["Work", "About", "Courses", "Services", "Contact Us"];

  return (
    <>
      {/* Open Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-6 right-6 z-50 px-6 py-3 bg-black/10 backdrop-blur-sm border border-black/20 rounded-md text-black hover:bg-black/20 transition-all font-medium"
        >
          Menu
        </button>
      )}

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        >
          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className="absolute backdrop-blur-md top-0 right-0 w-[33.33%] h-full"
            style={{
              backgroundColor: "rgba(180, 200, 220, 0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              ref={buttonRef}
              className="absolute close top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-50"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 3L3 11M3 3L11 11"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Menu Items */}
            <div className="flex flex-col justify-center h-full pl-12 space-y-5">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="nav-item text-black text-4xl font-normal hover:opacity-80 transition-opacity cursor-pointer"
                  style={{
                    fontFamily: "sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
