"use client"; // Ensure this component is rendered on the client-side

import { signIn } from "next-auth/react"; // Ensure you import signIn correctly
import { useState, useEffect } from "react";
import { getSessionData } from "@/actions/getSession";

export default function SignIn() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSessionData();
      setSession(res);
    };
    fetchData();
  }, []);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission
    await signIn("github", { redirectTo: "/home" });
  };

  return (
    <form onSubmit={handleSignIn}>
      <button
        type="submit"
        className="bg-white text-black p-2 px-5 border-2 border-black rounded-full hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white transition-all ease-in-out duration-300"
      >
        {session ? `👋, ${session.user.name}` : "Sign in with GitHub"}
      </button>
    </form>
  );
}
