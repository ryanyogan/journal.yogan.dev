import { analayze } from "@/lib/ai";
import { getUserByClerkId } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
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

  const analysis = await analayze(entry.content);
  await db.analysis.create({
    data: {
      entryId: entry.id,
      summary: analysis!.summary,
      subject: analysis!.subject,
      negative: analysis!.negative,
      color: analysis!.color,
      mood: analysis!.mood,
    },
  });

  revalidatePath("/journal");

  return NextResponse.json({ data: entry });
}
