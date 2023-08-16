import { JournalEntry } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface EntryCardProps {
  entry: JournalEntry;
}

export function EntryCard({ entry }: EntryCardProps) {
  const date = new Date(entry.createdAt).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = new Date(entry.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

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
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-row justify-between">
          <div>😁</div>

          <div className="text-neutral-400">{time}</div>
        </div>
      </CardFooter>
    </Card>
  );
}
