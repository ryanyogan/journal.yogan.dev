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
        <CardTitle className="text-md text-black font-medium">{date}</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator />
        <div className="w-full text-neutral-400 py-4">Summary</div>
        <Separator />
        <div className="w-full text-neutral-400 py-4">Mood</div>
      </CardContent>
    </Card>
  );
}
