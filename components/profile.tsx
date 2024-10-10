"use client";

import Image from "next/image";
import { getSessionData } from "@/actions/getSession";
import { useEffect, useState } from "react";
import SignOut from "./sign-out";
import { Session } from "@/types/types";

const Profile = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [show, setShow] = useState(false);

  // use async await to get session data
  useEffect(() => {
    const fetchData = async () => {
      const res = await getSessionData();
      if (res && res.user) {
        setSession(res as Session);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative">
      {session && (
        <div>
          <Image
            src={session.user.image as string}
            alt=""
            width={35}
            height={35}
            className="rounded-full absolute right-1 cursor-pointer"
            onClick={() => setShow(!show)}
          />
          {show && (
            <div className="bg-white absolute right-1 top-10 rounded-md shadow-sm shadow-gray-400 dark:text-black">
              <div className="p-3 pr-10">
                <p className="font-semibold">{session.user.name}</p>
                <p className="text-sm mt-[-2px]">{session.user.email}</p>
              </div>
              <SignOut />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
