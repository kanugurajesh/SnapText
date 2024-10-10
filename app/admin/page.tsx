"use client";

import { getSessionData } from "@/actions/getSession";
import { Session } from "@/types/types";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism"; // You can change the theme
import Image from "next/image";
import { useTheme } from "next-themes";

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
    <main className="">
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
          <SyntaxHighlighter language="json" style={solarizedlight}>
            {"Session Data: \n" + JSON.stringify(sessionData, null, 2)}
          </SyntaxHighlighter>
        </div>
      ) : (
        <p>Loading session data...</p>
      )}
    </main>
  );
};

export default Admin;
