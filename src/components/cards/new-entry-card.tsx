"use client";

import { createNewEntry } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function NewEntryCard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClick = async () => {
    setIsLoading(true);

    const data = await createNewEntry();

    router.refresh();
    router.push(`/journal/${data.id}`);
  };

  return (
    <Card className="cursor-pointer shadow bg-neutral" onClick={handleOnClick}>
      <CardHeader>
        <CardTitle>New Entry</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <div>
            <p className="text-black font-semibold">
              Click to create a new journal entry, and remember to brush your
              teeth.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
