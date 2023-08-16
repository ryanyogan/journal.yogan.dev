import { getUserByClerkId } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(_req: Request) {
  const user = await getUserByClerkId();

  const entry = await db.journalEntry.create({
    data: {
      userId: user.id,
      content: "Write about your day!",
    },
  });

  return NextResponse.json({ data: entry });
}
