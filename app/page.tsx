import Toggle from "@/components/toggle";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="p-4">
      <div className="float-right">
        <Toggle />
      </div>
      <div className="mt-20 flex flex-col items-center gap-6">
        <Link
          href=""
          className="text-sm border border-black rounded-full p-1 px-[20px] bg-white font-semibold gap-2 flex items-center justify-center"
        >
          <span className="mb-[1px]">Watch Demo</span>
          <Image src="./right-arrow.svg" alt="" width={15} height={10} className="mt-[3px]" />
        </Link>
        <div></div>
        <p></p>
        <div>
          <Link href=""></Link>
          <Link href=""></Link>
        </div>
      </div>
    </main>
  );
}
