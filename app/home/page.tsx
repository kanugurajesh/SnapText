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
              {showText ? (
                <div className="overflow-y-scroll max-h-[70vh]">{textData}</div>
              ) : (
                <pre className="overflow-y-scroll max-h-[70vh] ">
                  {JSON.stringify(JSON.parse(transcript), null, 2)}
                </pre>
              )}
            </div>
            <div className="flex gap-2 items-center justify-center">
              <div
                className={
                  "p-2 rounded-md cursor-pointer transition-all ease-in-out duration-300 bg-black text-white hover:bg-gray-100 hover:text-black px-3"
                }
                onClick={() => {
                  navigator.clipboard.writeText(
                    showText ? textData : transcript
                  );
                  toast.success(
                    `${showText ? "Text" : "Json"} Copied to clipboard`
                  );
                }}
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
                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                  />
                </svg>
              </div>
              <div
                className={
                  "p-2 rounded-md cursor-pointer transition-all ease-in-out duration-300 bg-black text-white hover:bg-gray-100 hover:text-black px-3"
                }
                onClick={() => {
                  // write code to download the file text or json
                  const element = document.createElement("a");
                  const file = new Blob([showText ? textData : transcript], {
                    type: showText ? "text/plain" : "application/json",
                  });
                  element.href = URL.createObjectURL(file);
                  element.download = showText
                    ? "transcript.txt"
                    : "transcript.json";
                  document.body.appendChild(element);
                  element.click();
                  toast.success(
                    `${showText ? "Text" : "Json"} file downloaded`
                  );
                }}
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
              </div>
            </div>
          </code>
        )}
      </main>
    </>
  );
};

export default Home;
