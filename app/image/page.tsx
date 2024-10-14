import { useState } from "react";
import Image from "next/image";

const page = () => {
  const [src, setSrc] = useState<string>("");
  const [vid, setVid] = useState<string>("");
  const [urls, setUrls] = useState<string[]>([]);

  const createUrl = (number: number, vid: string) => {
    return `https://img.youtube.com/vi/${vid}/${number}.jpg`;
  };

  return (
    <main>
      <div>
        <input type="text" className="w-52 h-14" />
        <button>Submit</button>
      </div>
    </main>
  );
};

export default page;
