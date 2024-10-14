"use client";

import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Toggle from "@/components/toggle";

const Page = () => {
  const [src, setSrc] = useState<string>("");
  const [vid, setVid] = useState<string>("");
  const [lImage, setLImage] = useState<string>("");
  const [urls, setUrls] = useState<string[]>([
    "https://img.youtube.com/vi/PuOVqP_cjkE/0.jpg",
    "https://img.youtube.com/vi/PuOVqP_cjkE/1.jpg",
    "https://img.youtube.com/vi/PuOVqP_cjkE/2.jpg",
    "https://img.youtube.com/vi/PuOVqP_cjkE/3.jpg",
  ]);

  const handleSubmit = () => {
    if (!src.includes("youtu.be")) {
      toast.error("Invalid URL");
      return;
    }

    let temp = src.replaceAll("https://youtu.be/", "");
    temp = temp.replaceAll("?feature=shared", "");

    setVid(temp);
    toast.success("URL submitted successfully");
  };

  const handleThumbnails = () => {
    if (!vid) {
      toast.error("Please submit a valid URL");
      return;
    }
    getUrls(vid);
    toast.success("Thumbnails fetched successfully");
  };

  const getUrls = async (vid: string) => {
    const urls = Array.from({ length: 4 }, (_, i) => createUrl(i, vid));
    setUrls(urls);
  };

  const createUrl = (number: number, vid: string) => {
    return `https://img.youtube.com/vi/${vid}/${number}.jpg`;
  };

  return (
    <>
      <main
        className={`min-h-screen flex flex-col items-center justify-center gap-10 relative z-10 overflow-y-scroll`}
      >
        <div className="absolute top-2 left-2">
          <Toggle />
        </div>
        {lImage && (
          <div>
            <div className="fixed inset-0 bg-black opacity-50 z-10 pointer-events-auto" />
            <div className="rounded-md w-[300px] h-[250px] sm:w-[500px] sm:h-[400px] absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-full h-full">
                <Image
                  src={lImage}
                  width={300}
                  height={200}
                  alt="Large Image"
                  className="rounded-md w-full h-full"
                />
                <button
                  className="p-2 w-10 h-10 bg-red-600 text-white flex items-center justify-center absolute top-0 right-0 hover:bg-red-700 transition-all ease-in-out duration-300"
                  onClick={() => setLImage("")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-2 items-center justify-center flex-col sm:flex-row">
          <input
            type="text"
            className="border-2 border-black rounded-md p-[6px] w-[300px] text-black font-semibold focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            onChange={(e) => setSrc(e.target.value)}
            placeholder="Enter URL"
          />
          <button
            onClick={handleSubmit}
            className="p-2 bg-black text-white rounded-md w-full border-black border-2 hover:bg-white hover:text-black transition-all ease-in-out duration-300 font-semibold"
          >
            Submit
          </button>
          <button
            onClick={handleThumbnails}
            className="p-2 bg-black text-white rounded-md w-full border-black border-2 hover:bg-white hover:text-black transition-all ease-in-out duration-300 font-semibold"
          >
            Get Thumbnails
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {urls.map((url, i) => (
            <div className="w-[300px] h-[300px] relative" key={i}>
              <Image
                key={i}
                src={url}
                width={300}
                height={300}
                alt={`${i}.jpg`}
                className="rounded-md cursor-pointer"
                onClick={() => setLImage(url)}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Page;
