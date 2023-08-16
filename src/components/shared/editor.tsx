"use client";

import { updateEntry } from "@/lib/api";
import { JournalEntry } from "@prisma/client";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import { Textarea } from "../ui/textarea";

interface EditorProps {
  entry: JournalEntry;
}

export function Editor({ entry }: EditorProps) {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);

  useAutosave({
    data: value,
    onSave: async (updatedValue: any) => {
      setIsLoading(true);

      const updatedEntry = await updateEntry({
        id: entry.id,
        content: updatedValue,
      });

      setIsLoading(false);
    },
  });

  return (
    <div className="w-full h-full">
      {isLoading && <div>Loading</div>}
      <Textarea
        spellCheck
        tabIndex={0}
        className="text-[16px] sm:text-sm text-black"
        rows={20}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
}
