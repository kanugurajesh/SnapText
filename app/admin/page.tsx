"use client";

import { getSessionData } from "@/actions/getSession";
import { Session } from "@/types/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Toggle from "@/components/toggle";
import Profile from "@/components/profile";
import SyntaxHighlighter from "react-syntax-highlighter";
import { prism, oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Admin = () => {
  const [sessionData, setSessionData] = useState<Session | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSessionData();
      if (data && data.user) setSessionData(data as Session);
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen max-h-fit w-screen relative">
      {theme == "dark" ? (
        <div>
          <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
        </div>
      )}

      <div className="absolute top-4 w-screen p-4">
        <Toggle />
        <Profile />
      </div>

      {sessionData ? (
        <div className="rounded-md flex flex-col items-center justify-center gap-6">
          <h1 className="text-2xl font-bold">Admin Page</h1>
          <Image
            src={sessionData.user.image}
            alt="User Image"
            width={200}
            height={300}
            className={`rounded-lg shadow-md my-5 ${
              theme == "dark" ? "shadow-white" : "shadow-black"
            }`}
          />
          <div className="overflow-x-scroll w-[90vw]">
            <SyntaxHighlighter
              language="json"
              style={theme == "light" ? oneDark : prism}
            >
              {JSON.stringify(sessionData, null, 2)}
            </SyntaxHighlighter>
          </div>
        </div>
      ) : (
        <p>Loading session data...</p>
      )}
    </main>
  );
};

export default Admin;
