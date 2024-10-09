"use client";

import { useTheme } from "next-themes";

const Toggle = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div>
      {theme == "light" ? (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
        </div>
      ) : (
        <div>
          <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        </div>
      )}
      <div
        className={`w-12 h-6 bg-black border-2 border-black rounded-xl flex items-center p-[1px] dark:bg-white justify-start ${
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
