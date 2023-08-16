"use client";

import { JournalEntry } from "@prisma/client";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

interface EditorProps {
  entry: JournalEntry;
}

export function Editor({ entry }: EditorProps) {
  const [value, setValue] = useState(entry.content);

  return (
    <div className="w-full h-full">
      <Textarea
        className="text-xl"
        rows={10}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
}
