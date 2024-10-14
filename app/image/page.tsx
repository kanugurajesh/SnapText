"use client";

import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const page = () => {
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
  };

  const handleThumbnails = () => {
    if (!vid) {
      toast.error("Please submit a valid URL");
      return;
    }
    getUrls(vid);
  };

  const getUrls = async (vid: string) => {
    const urls = Array.from({ length: 4 }, (_, i) => createUrl(i, vid));
    setUrls(urls);
  };

  const createUrl = (number: number, vid: string) => {
    return `https://img.youtube.com/vi/${vid}/${number}.jpg`;
  };

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center gap-10 relative z-10 overflow-y-scroll`}
    >
      <Toaster />
      {lImage && (
        <div>
          <div className="fixed inset-0 bg-black opacity-50 z-10 pointer-events-auto" />
          <Image
            src={lImage}
            width={300}
            height={300}
            alt="Large Image"
            className="rounded-md sm:w-[540px] sm:h-[400px] absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            onClick={() => setLImage("")}
          />
        </div>
      )}
      <div className="flex gap-2 items-center justify-center flex-col sm:flex-row">
        <input
          type="text"
          className="border-2 border-black rounded-md p-[6px] w-[300px] text-black"
          onChange={(e) => setSrc(e.target.value)}
          placeholder="Enter URL"
        />
        <button
          onClick={handleSubmit}
          className="p-2 bg-black text-white rounded-md w-full"
        >
          Submit
        </button>
        <button
          onClick={handleThumbnails}
          className="p-2 bg-black text-white rounded-md w-full"
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
            <Link
              href={url}
              download
              className="bg-white p-2 absolute bottom-0 right-0"
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
                  d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                />
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default page;
