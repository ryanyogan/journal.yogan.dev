import { Analysis, JournalEntry } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface EntryCardProps {
  entry: JournalEntry & { analysis: Analysis | null };
}

export function EntryCard({ entry }: EntryCardProps) {
  const date = new Date(entry.updatedAt).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = new Date(entry.updatedAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <Card className="flex flex-col cursor-pointer hover:border hover:shadow hover:border-neutral-700/60 transition-colors ease-in-out duration-300">
      <CardHeader>
        <CardTitle>{date}</CardTitle>
        <CardDescription>{time}</CardDescription>
      </CardHeader>
      <CardContent className="text-ellipsis h-[100px]">
        {entry?.analysis?.summary || ""}
      </CardContent>
      <CardFooter>{entry?.analysis?.negative ? "😡" : "🤗"}</CardFooter>
    </Card>
  );
}
