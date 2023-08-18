"use client";

import { JournalEntry } from "@prisma/client";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function AnalysisCard({ entry }: { entry: JournalEntry }) {
  const analysisData = [
    { name: "Summary", value: entry?.analysis?.summary },
    { name: "Subject", value: entry?.analysis?.subject },
    { name: "Mood", value: entry?.analysis?.mood },
    { name: "Vibe", value: entry?.analysis?.negative ? "😡" : "🤗" },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex flex-row items-center justify-between">
          Analysis
          <Badge
            className="px-3 py-1 text-white uppercase"
            style={{
              backgroundColor: entry?.analysis?.color
                ? entry?.analysis?.color
                : "",
            }}
          >
            {entry?.analysis?.mood}
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
  );
}
