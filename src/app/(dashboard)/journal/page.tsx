import { EntryCard } from "@/components/cards/entry-card";
import { NewEntryCard } from "@/components/cards/new-entry-card";
import { Separator } from "@/components/ui/separator";
import { getEntries } from "@/queries/get-entries";
import Link from "next/link";

export const runtime = "edge";

export default async function JournalPage() {
  const entries = await getEntries();

  return (
    <div className="mb-20">
      <h1 className="text-black font-semibold">Entries</h1>
      <h3 className="text-neutral-500">
        All of your glorious entries, or create a new one.
      </h3>
      <Separator className="my-8" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <NewEntryCard />

        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
}
