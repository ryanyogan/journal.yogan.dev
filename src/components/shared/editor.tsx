"use client";

import { updateEntry } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Analysis, JournalEntry } from "@prisma/client";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Spinner } from "./spinner";

interface EditorProps {
  entry: (JournalEntry & { analysis: Analysis | null }) | null;
}

export function Editor({ entry }: EditorProps) {
  const [value, setValue] = useState(entry?.content);
  const [currentEntry, setEntry] = useState(entry);
  const [isLoading, setIsLoading] = useState(false);

  const analysisData = [
    { name: "Summary", value: currentEntry?.analysis?.summary },
    { name: "Subject", value: currentEntry?.analysis?.subject },
    { name: "Mood", value: currentEntry?.analysis?.mood },
    { name: "Vibe", value: currentEntry?.analysis?.negative ? "😡" : "🤗" },
  ];

  useAutosave({
    data: value,
    onSave: async (updatedValue: any) => {
      if (updatedValue === entry?.content) {
        return;
      }

      setIsLoading(true);

      const updatedEntry = await updateEntry({
        id: entry?.id as string,
        content: updatedValue,
      });

      setEntry(updatedEntry);
      setIsLoading(false);
    },
  });

  return (
    <>
      <h1 className="text-black font-semibold">Create a New Entry</h1>
      <h3 className="text-neutral-500">
        Create a new journal entry, when you finish typing your work will be
        saved, and analyed by the AI gods.
      </h3>
      <Separator className="my-8" />
      <div className="flex gap-y-4 sm:gap-x-4 flex-col-reverse sm:justify-start sm:flex-row mb-20">
        <div className="sm:flex-1 relative">
          <div
            className={cn(
              "hidden bottom-2 right-2 absolute h-3 w-3 bg-green-500 rounded-full",
              isLoading && "block animate-pulse"
            )}
          />
          <Textarea
            spellCheck
            tabIndex={0}
            className="text-[16px] h-[300px] sm:h-[600px] sm:text-sm text-black"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>
        <div className="w-full sm:max-w-sm">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex flex-row items-center justify-between">
                <div className="flex items-center justify-center gap-x-2">
                  Analysis {isLoading && <Spinner />}
                </div>
                <Badge
                  className="px-3 py-1 text-white uppercase"
                  style={{
                    backgroundColor: currentEntry?.analysis?.color
                      ? currentEntry?.analysis?.color
                      : "",
                  }}
                >
                  {currentEntry?.analysis?.mood}
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
    </>
  );
}
