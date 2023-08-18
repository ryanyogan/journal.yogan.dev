import { getUserByClerkId } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getEntries() {
  const user = await getUserByClerkId();

  const entries = await db.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      analysis: true,
    },
  });

  return entries;
}
