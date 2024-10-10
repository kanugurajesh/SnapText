"use server";

import { auth } from "@/auth";

export const getSessionData = async () => {
    "use server"
  const session = await auth();
  console.log(session)
  return session;
};
