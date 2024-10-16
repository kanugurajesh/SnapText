"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import SignIn from "@/components/sign-in";
import Toggle from "@/components/toggle";
import Profile from "@/components/profile";

export default function Home() {
  const { theme } = useTheme();

  return (
    <main className="p-4">
      {theme == "dark" ? (
        <div>
          <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
        </div>
      )}
      <div className="p-4">
        <div className="float-left">
          <Toggle />
        </div>
        <Profile />
      </div>
      <div className="mt-24 flex flex-col items-center gap-7 justify-center w-full max-w-2xl mx-auto">
        <Link
          href=""
          className="text-sm border border-black bg-black text-white rounded-full p-1 px-[20px] font-semibold gap-2 flex items-center justify-center dark:bg-white dark:text-black"
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
          Download youtube transcript and images
        </div>
        <p className="text-center text-lg leading-6 text-gray-600 dark:text-gray-200 font-medium">
          Ready-to-use, simply paste the YouTube video link and easily download
          the transcript and images. All functionalities crafted for seamless
          integration.
        </p>
        <div className="flex gap-4 font-semibold flex-col min-[420px]:flex-row">
          <Link
            href={"/image"}
            className="bg-black text-white p-2 px-5 border-black border-2 rounded-full hover:bg-white hover:text-black dark:bg-white dark:text-black transition-all ease-in-out duration-300 text-center"
          >
            Go to Image (Free)
          </Link>
          <SignIn />
        </div>
      </div>
    </main>
  );
}
