"use client";

import Toggle from "@/components/toggle";
import Profile from "@/components/profile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const [url, setUrl] = useState<string>("");
  const [VideoId, setVideoId] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("");
  const [showText, setShowText] = useState<boolean>(true);
  const [showSubmit, setShowSubmit] = useState<boolean>(true);
  const [textData, setTextData] = useState<string>("");

  useEffect(() => {
    if (transcript) {
      setTextData(JsonToText(transcript));
    }
  });

  const JsonToText = (json: string): string => {
    let data = JSON.parse(json);
    let text = "";
    data.forEach((element: any) => {
      text += element.text + " ";
    });
    return text;
  };

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
      setTranscript("");
      setShowSubmit(false);
    }
  };

  const handleTranscribe = async (): Promise<void> => {
    if (VideoId) {
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
    }
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
        {VideoId && (
          <iframe
            width="300"
            height="300"
            src={`https://www.youtube.com/embed/${VideoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="sm:w-[500px] sm:h-[300px] w-[300px] h-[300px] rounded-md shadow-md dark:shadow-white dark:bg-white"
          ></iframe>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            name=""
            id=""
            className="rounded-md p-2 border-2 text-black border-black px-4 font-semibold placeholder:text-black tracking-wide focus:outline-offset-0 focus:ring-2 focus:ring-black focus:border-transparent dark:focus:ring-white dark:border-white dark:placeholder-black dark:text-black dark:bg-white"
            placeholder="Enter the Url"
            onChange={(e) => {
              setUrl(e.target.value);
              setShowSubmit(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <button
            className="p-2 bg-black border-l-2 border-t-2 border-black text-white rounded-md px-2 font-semibold hover:bg-white hover:text-black hover:shadow-lg hover:shadow-black transition-all ease-in-out duration-300 dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white dark:hover:shadow-white"
            onClick={showSubmit ? handleSubmit : handleTranscribe}
          >
            {showSubmit ? "Submit" : "Transcribe"}
          </button>
        </div>
        {transcript && (
          <code className="shadow-sm shadow-black p-4 rounded-md dark:shadow-white dark:bg-white dark:text-black flex flex-col gap-4">
            <div className="flex gap-2 items-center justify-center">
              <div
                className={`p-2 rounded-md cursor-pointer transition-all ease-in-out duration-300 ${
                  showText
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 hover:text-black"
                }`}
                onClick={() => setShowText(true)}
              >
                Text
              </div>
              <div
                className={`p-2 rounded-md cursor-pointer transition-all ease-in-out duration-300 ${
                  !showText
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 hover:text-black"
                }`}
                onClick={() => setShowText(false)}
              >
                Json
              </div>
            </div>
            <div>
              {showText && (
                <div className="overflow-y-scroll max-h-[70vh]">{textData}</div>
              )}
              {!showText && (
                <pre
                  className="overflow-y-scroll"
                  style={{ maxHeight: "300px", maxWidth: "500px" }}
                >
                  {JSON.stringify(JSON.parse(transcript), null, 2)}
                </pre>
              )}
            </div>
          </code>
        )}
      </main>
    </>
  );
};

export default Home;
