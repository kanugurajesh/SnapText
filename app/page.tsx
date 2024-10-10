import Toggle from "@/components/toggle";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-4">
      <div className="float-right">
        <Toggle />
      </div>
      <div className="mt-24 flex flex-col items-center gap-8 justify-center w-full">
        <Link
          href=""
          className="text-sm border border-black rounded-full p-1 px-[20px] bg-white font-semibold gap-2 flex items-center justify-center dark:text-black"
        >
          <span className="mb-[1px]">Watch Demo</span>
          <Image
            src="./right-arrow.svg"
            alt=""
            width={15}
            height={10}
            className="mt-[3px]"
          />
        </Link>
        <div className="flex flex-col text-3xl tracking-wide leading-tight text-center font-semibold max-w-64">
          <span className="mx-auto inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">Download youtube transcript</span>
        </div>
        <p></p>
        <div>
          <Link href=""></Link>
          <Link href=""></Link>
        </div>
      </div>
    </main>
  );
}
