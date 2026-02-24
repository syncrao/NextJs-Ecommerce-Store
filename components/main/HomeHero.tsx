"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomeHero() {

  console.log("HomeHero component rendered");
  const desktopImages = [
    "/hero/desktop1.jpg",
    "/hero/desktop2.jpg",
    "/hero/desktop3.jpg",
  ];

  const mobileImages = [
    "/hero/mobile1.jpg",
    "/hero/mobile2.jpg",
    "/hero/mobile3.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % desktopImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Link href="/products" className="block w-full">
      <div className="relative w-full overflow-hidden aspect-9/9 sm:aspect-28/9">
        {desktopImages.map((img, index) => (
          <div
            key={index}
            className={`hidden sm:block absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt={`Slide ${index}`}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}

        {mobileImages.map((img, index) => (
          <div
            key={`m-${index}`}
            className={`block sm:hidden absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt={`Mobile Slide ${index}`}
              fill
              className="object-cover"
            />
          </div>
        ))}

        <div className="absolute bottom-4 inset-x-0 flex justify-center gap-3 z-10">
          {desktopImages.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition ${
                i === current ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
