"use client";

import Toggle from "@/components/toggle";
import Profile from "@/components/profile";
import { useState } from "react";
import toast from "react-hot-toast";

// https://youtu.be/oMm8VzW3_lU

const Home = () => {
  const [url, setUrl] = useState("");
  const [VideoId, setVideoId] = useState("");
  const [transcript, setTranscript] = useState("");

  const handleSubmit = async () => {
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
      <main className="flex flex-col items-center justify-center mt-16 p-4 gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            name=""
            id=""
            className="rounded-md p-2 border-2 border-black px-4"
            placeholder="Enter the Url"
            onChange={(e) => {
              console.log(e.target.value);
              setUrl(e.target.value);
            }}
          />
          <button
            className="p-2 bg-black text-white rounded-md px-2 font-semibold"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <code className="shadow-sm shadow-black p-4 rounded-md">
          {transcript
            ? transcript
            : "Transcription will appear here after submission"}
        </code>
      </main>
    </>
  );
};

export default Home;
