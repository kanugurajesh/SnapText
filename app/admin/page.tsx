"use client";

import { getSessionData } from "@/actions/getSession";
import { Session } from "@/types/types";
import { useEffect, useState } from "react";
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
    <main className="min-h-screen max-h-fit bg-gradient-to-r from-gray-400 to-gray-900">
      {sessionData ? (
        <div className="rounded-md flex flex-col items-center justify-center gap-6 h-[120vh]">
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
          <code className="max-w-64 mx-auto">
            {JSON.stringify(sessionData)}
          </code>
        </div>
      ) : (
        <p>Loading session data...</p>
      )}
    </main>
  );
};

export default Admin;