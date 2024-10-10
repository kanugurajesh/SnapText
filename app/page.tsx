"use client";

import Toggle from "@/components/toggle";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <main className="p-4">
      <div className="float-right">
        <Toggle />
      </div>
      <div className="mt-24 flex flex-col items-center gap-8 justify-center w-full max-w-2xl mx-auto">
        <Link
          href=""
          className="text-sm border border-black bg-black text-white rounded-full p-1 px-[20px] dark:bg-white font-semibold gap-2 flex items-center justify-center dark:text-black"
        >
          <span className="mb-[1px] leading-6">Watch Demo</span>
          <Image
            src={`${
              theme == "dark" ? "./right-arrow-black" : "./right-arrow-white"
            }.svg`}
            alt="Play button"
            width={14}
            height={10}
            className="mt-[2px]"
          />
        </Link>
        <div className="flex flex-col text-3xl tracking-wide leading-tight text-center font-semibold sm:text-6xl">
          Download youtube transcript
        </div>
        <p className="text-center text-lg leading-6 text-gray-600 dark:text-gray-200 font-medium">
          Ready-to-use, simply paste the YouTube video link and easily download
          the transcript and images. All functionalities crafted for seamless
          integration.
        </p>
        <div>
          <Link href=""></Link>
          <Link href=""></Link>
        </div>
      </div>
    </main>
  );
}
