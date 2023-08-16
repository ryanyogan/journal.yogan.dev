import { Editor } from "@/components/shared/editor";
import { getUserByClerkId } from "@/lib/auth";
import { db } from "@/lib/db";

export const runtime = "edge";

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
  });

  return entry;
}

export default async function EntryPage({ params }: IParams) {
  const entry = await getEntry(params.id);

  if (!entry) {
    return null;
  }

  return (
    <div>
      <Editor entry={entry} />
    </div>
  );
}
