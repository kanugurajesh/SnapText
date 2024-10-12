import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

export async function POST(req: NextRequest) {
  const { Vid } = await req.json();

  try {
    const data = await YoutubeTranscript.fetchTranscript(
      `https://youtu.be/${Vid}?feature=shared`
    ).then((transcript) => {
      let data = "";
      transcript.forEach((caption) => {
        data += caption.text + " ";
      });
      return data;
    });

    console.log(data);

    return NextResponse.json({ data: JSON.stringify(data) });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.log("An unknown error occurred");
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}
