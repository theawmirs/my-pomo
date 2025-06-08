import { del } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { url } = await request.json();
  await del(url);
  return NextResponse.json({ message: "Blob deleted" });
}
