"use client";

import { createNewEntry } from "@/lib/api";
import { cn } from "@/lib/utils";
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
    <Card
      onClick={handleOnClick}
      className="cursor-pointer hover:border hover:border-neutral-700/60 transition-colors ease-in-out duration-300"
    >
      <CardHeader>
        <CardTitle className={cn(isLoading && "animate-pulse")}>
          {isLoading ? "Creating..." : "New Entry"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <div>
            <p className="text-neutral-700 underline decoration-neutral-300">
              Create a new entry for the greater good.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
