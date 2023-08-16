import { JournalEntry } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

interface EntryCardProps {
  entry: JournalEntry;
}

export function EntryCard({ entry }: EntryCardProps) {
  const date = new Date(entry.createdAt).toDateString();

  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <CardTitle className="text-lg text-black font-medium">{date}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full text-black font-light py-4">
          {entry.content.slice(0, 50)}
        </div>
        <Separator />
        <div className="w-full text-neutral-600 py-4">Mood</div>
      </CardContent>
    </Card>
  );
}
