// hooks/useNotes.ts
import { useLocalStorage } from "@mantine/hooks";

export interface Note {
  id: string;
  title: string;
  content: string;
  type: "note" | "reminder" | "archive" | "trash";
  backgroundColor?: string;
}

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<Note[]>({
    key: "meu-bloco-notas-data",
    defaultValue: [],
  });

  const addNote = (
    title: string,
    content: string,
    type: Note["type"] = "note",
  ) => {
    const newNote: Note = { id: Date.now().toString(), title, content, type };
    setNotes((current) => [...current, newNote]);
  };

  const updateNote = (id: string, fields: Partial<Note>) => {
    setNotes((current) =>
      current.map((n) => (n.id === id ? { ...n, ...fields } : n)),
    );
  };

  const deleteNote = (id: string) => {
    setNotes((current) => current.filter((n) => n.id !== id));
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
  };
}
