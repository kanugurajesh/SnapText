"use client";

import { useTheme } from "next-themes";
import toast, { Toaster } from "react-hot-toast";

const Toggle = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    toast.dismiss();
    if (theme == "light") {
      setTheme("dark");
      toast.success("Dark mode enabled");
    } else {
      setTheme("light");
      toast.success("Light mode enabled");
    }
  };

  return (
    <div>
      <Toaster />
      <div
        className={`w-12 h-6 bg-black border-2 border-black rounded-xl flex items-center p-[1.5px] dark:bg-white justify-start ${
          theme == "dark" && "justify-end"
        }`}
        onClick={changeTheme}
      >
        <div
          className="h-[18px] w-[18px] rounded-full bg-white dark:bg-black"
          onClick={changeTheme}
        ></div>
      </div>
    </div>
  );
};

export default Toggle;
