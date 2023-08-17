import { Editor } from "@/components/shared/editor";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    include: {
      analysis: true,
    },
  });

  return entry;
}

export default async function EntryPage({ params }: IParams) {
  const entry = await getEntry(params.id);

  if (!entry) {
    return null;
  }

  const analysisData = [
    { name: "Summary", value: entry?.analysis?.summary },
    { name: "Subject", value: entry?.analysis?.subject },
    { name: "Mood", value: entry?.analysis?.mood },
    { name: "Negative", value: entry?.analysis?.negative },
  ];

  return (
    <div className="h-full w-full">
      <h1 className="text-black font-semibold">Create a New Entry</h1>
      <h3 className="text-neutral-500">
        Create a new journal entry, when you finish typing your work will be
        saved, and analyed by the AI gods.
      </h3>
      <Separator className="my-8" />
      <div className="flex gap-y-4 sm:gap-x-4 flex-col sm:justify-start sm:flex-row">
        <div className="sm:flex-1">
          <Editor entry={entry} />
        </div>
        <div className="w-full sm:max-w-sm">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex flex-row items-center justify-between">
                Analysis
                <Badge
                  className="px-3 py-1"
                  style={{
                    backgroundColor: entry?.analysis?.color
                      ? entry?.analysis?.color
                      : "",
                  }}
                >
                  Good Mood
                </Badge>
              </CardTitle>
              <CardDescription>Statistics from your entry.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul>
                {analysisData.map((item) => (
                  <li
                    key={item.name}
                    className="py-2 text-neutral-700 text-sm flex flex-col items-start"
                  >
                    <span className="font-semibold">{item.name}</span>
                    <span className="text-neutral-500">{item.value}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
