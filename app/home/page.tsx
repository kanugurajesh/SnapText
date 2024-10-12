"use client";

import Toggle from "@/components/toggle";
import Profile from "@/components/profile";
import { useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const [url, setUrl] = useState("");
  const [VideoId, setVideoId] = useState("");
  const [transcript, setTranscript] = useState("");

  const handleSubmit = async (): Promise<void> => {
    // get Vid from the url
    if (url) {
      let rurl = url.replaceAll("https://", "");
      rurl = rurl.replace("?feature=shared", "");
      let list = rurl.split("/");
      if (list[0] !== "youtu.be") {
        toast.error("The link is not a valid youtube url");
        return;
      }
      setVideoId(list[1]);
    }

    const res = await fetch("/api/transcribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Vid: VideoId }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Transcription successful");
    } else {
      toast.error("Transcription failed");
    }

    setUrl("");
    setTranscript(data.data);
  };

  return (
    <>
      <div className="p-4">
        <div className="float-left">
          <Toggle />
        </div>
        <Profile />
      </div>
      <main className="flex flex-col items-center justify-center mt-16 p-4 gap-8">
        <div className="flex gap-2">
          <input
            type="text"
            name=""
            id=""
            className="rounded-md p-2 border-2 text-black border-black px-4 font-semibold placeholder:text-black tracking-wide focus:outline-offset-0 focus:ring-2 focus:ring-black focus:border-transparent dark:focus:ring-white dark:border-white dark:placeholder-black dark:text-black dark:bg-white"
            placeholder="Enter the Url"
            onChange={(e) => {
              console.log(e.target.value);
              setUrl(e.target.value);
            }}
          />
          <button
            className="p-2 bg-black border-l-2 border-t-2 border-black text-white rounded-md px-2 font-semibold hover:bg-white hover:text-black hover:shadow-lg hover:shadow-black transition-all ease-in-out duration-300 dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:hover:shadow-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <code className="shadow-sm shadow-black p-4 rounded-md dark:shadow-white dark:bg-white dark:text-black">
          {transcript
            ? transcript
            : "Transcription will appear here after submission"}
        </code>
      </main>
    </>
  );
};

export default Home;
