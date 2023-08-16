import { JournalEntry } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface EntryCardProps {
  entry: JournalEntry;
}

export function EntryCard({ entry }: EntryCardProps) {
  const date = new Date(entry.createdAt).toDateString();

  return (
    <Card className="cursor-pointer hover:border hover:border-neutral-700/60 transition-colors ease-in-out duration-300">
      <CardHeader>
        <CardTitle className="text-2xl text-black font-medium tracking-tighter">
          {date}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col space-y-4 text-neutral-500">
          <p>{entry.content.slice(0, 50)}</p>
          <p>😁</p>
        </div>
      </CardContent>
    </Card>
  );
}
