"use client";

import { JournalEntry } from "@prisma/client";

interface EditorProps {
  entry: JournalEntry;
}

export function Editor({ entry }: EditorProps) {
  return (
    <div>
      <div>Editor</div>
    </div>
  );
}
