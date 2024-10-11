"use client";

import { useRive } from "@rive-app/react-canvas";
import Link from "next/link";

export default function Simple() {
  const { rive, RiveComponent } = useRive({
    src: "./rive/404.riv",
    stateMachines: "JumpMachine",
    autoplay: false,
  });

  return (
    <div className="h-screen relative">
      <Link href="/" className="absolute bg-black font-medium p-2 px-4 top-2 left-2 rounded-md text-white">Back</Link>
      <RiveComponent
        onMouseEnter={() => rive && rive.play()}
        onMouseLeave={() => rive && rive.pause()}
      />
    </div>
  );
}
