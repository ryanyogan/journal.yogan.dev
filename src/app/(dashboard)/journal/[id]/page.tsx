import { Editor } from "@/components/shared/editor";
import { getUserByClerkId } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime = "edge";
export const dynamic = "force-dynamic";

type IParams = {
  params: {
    id: string;
  };
};

async function getEntry(id: string) {
  const user = await getUserByClerkId();
  const entry = await db.journalEntry.findUnique({
    where: {
      id,
      userId: user.id,
    },
    include: {
      analysis: true,
    },
  });

  return entry;
}

export default async function EntryPage({ params }: IParams) {
  const entry = await getEntry(params.id);

  if (!entry?.analysis || !entry.analysis?.id) {
    return null;
  }

  return (
    <div className="h-[calc(100vh+60px)] w-full">
      <Editor entry={entry} />
    </div>
  );
}
