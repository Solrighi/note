import {
  ActionIcon,
  Box,
  Button,
  Collapse,
  Flex,
  Group,
  Paper,
  Popover,
  Stack,
  Textarea,
  TextInput,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { useNotes } from "../hooks/useNotes";
import { useState } from "react";
import { readLocalStorageValue, useClickOutside } from "@mantine/hooks";
import {
  CheckSquareIcon,
  ImageIcon,
  PaintBrushIcon,
  PaletteIcon,
  SlidersHorizontalIcon,
  TrashIcon,
  XIcon,
} from "@phosphor-icons/react";

interface KeepInputProps {
  onSave: (title: string, content: string) => void;
}
interface NotesUpdate {
  id: string;
  field: any;
  newValue: string;
}

export default function Note() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const { colorScheme } = useMantineColorScheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hoveredNoteId, setHoveredNoteId] = useState<string | null>(null);
  const [openedColorPaletteId, setOpenedColorPaletteId] = useState<string | null>(
    null,
  );
  const noteColors = ["#ffffff", "#f5d867", "#6daafc", "#82faab", "#f27ec0"];

  const ref = useClickOutside(() => {
    if (title.trim() || content.trim()) {
      handleSave();
    } else {
      setIsExpanded(false);
    }
  });

  const handleSave = () => {
    // onSave(title, content);
    addNote(title, content);
    setTitle("");
    setContent("");
    setIsExpanded(false);
  };

  const handleUpdateNote = (id: string, field: any, newValue: any) => {
    const notes: any = readLocalStorageValue({ key: "meu-bloco-notas-data" });
    const specificNote = notes.find((note: any) => note.id === id);
    const newNote = {
      ...specificNote,
      title: field === "title" ? newValue : specificNote.title,
      content: field === "content" ? newValue : specificNote.content,
    };
    updateNote(id, newNote);

    console.log("newNote", newNote);
    // updateNote(id, newValue);
  };

  const handleUpdateNoteColor = (id: string, backgroundColor: string) => {
    updateNote(id, { backgroundColor });
    setOpenedColorPaletteId(null);
  };

  const handleClearNoteColor = (id: string) => {
    updateNote(id, { backgroundColor: undefined });
    setOpenedColorPaletteId(null);
  };

  const getNoteTextColor = (backgroundColor?: string) => {
    if (colorScheme === "dark" && backgroundColor) {
      return "#000000";
    }

    return "var(--mantine-color-text)";
  };

  const getNoteIconColor = (backgroundColor?: string) => {
    if (colorScheme === "dark" && backgroundColor) {
      return "#000000";
    }

    return undefined;
  };

  return (
    <Stack
      bg="var(--mantine-color-body)"
      align="stretch"
      justify="center"
      gap="lg"
    >
      <Flex justify={"center"}>
        <Paper
          ref={ref}
          shadow={isExpanded ? "md" : "sm"}
          radius="md"
          p="sm"
          withBorder
          w="100%"
          miw="50%"
          maw="500px"
          style={{
            transition: "box-shadow 0.2s ease",
          }}
        >
          <Collapse expanded={isExpanded}>
            <TextInput
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
              variant="unstyled"
              size="md"
              fw={500}
              mb={4}
            ></TextInput>
          </Collapse>
          <Textarea
            variant="unstyled"
            placeholder="Criar uma nota..."
            value={content}
            onChange={(e) => setContent(e.currentTarget.value)}
            onFocus={() => setIsExpanded(true)}
            autosize
            minRows={isExpanded ? 2 : 1}
            styles={{
              section: { width: "auto" },
            }}
            rightSection={
              !isExpanded && (
                <Flex>
                  <ActionIcon
                    variant="subtle"
                    aria-label="Settings"
                    size={30}
                    m={10}
                  >
                    <CheckSquareIcon style={{ width: "70%", height: "70%" }} />
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    aria-label="Settings"
                    size={30}
                    m={10}
                  >
                    <PaintBrushIcon style={{ width: "70%", height: "70%" }} />
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    aria-label="Settings"
                    size={30}
                    m={10}
                  >
                    <ImageIcon style={{ width: "70%", height: "70%" }} />
                  </ActionIcon>
                </Flex>
              )
            }
          ></Textarea>
          <Collapse expanded={isExpanded}>
            <Group justify="flex-end" mt="xs">
              <Button
                onClick={handleSave}
                variant="subtle"
                color="gray"
                style={{ color: "var(--mantine-color-text)" }}
              >
                Fechar
              </Button>
            </Group>
          </Collapse>
        </Paper>
      </Flex>
      <Flex gap="lg">
        {[...notes]
          .sort((a, b) => Number(b.id) - Number(a.id))
          .map((x, index) => {
          return (
            <Paper
              key={x.id || index}
              shadow="lg"
              radius="lg"
              withBorder
              p="xl"
              style={{ backgroundColor: x.backgroundColor || "var(--mantine-color-body)" }}
              onMouseEnter={() => setHoveredNoteId(x.id)}
              onMouseLeave={() => setHoveredNoteId(null)}
            >
              <TextInput
                value={x.title}
                variant="unstyled"
                onChange={(event) =>
                  handleUpdateNote(x.id, "title", event.currentTarget.value)
                }
                size="md"
                fw={500}
                mb={4}
                styles={{ input: { color: getNoteTextColor(x.backgroundColor) } }}
              ></TextInput>
              <Textarea
                value={x.content}
                variant="unstyled"
                onChange={(event) =>
                  handleUpdateNote(x.id, "content", event.currentTarget.value)
                }
                autosize
                w="auto"
                styles={{ input: { color: getNoteTextColor(x.backgroundColor) } }}
              />

              <Collapse expanded={hoveredNoteId === x.id}>
                <Group justify="space-between" mt="sm">
                  <Group
                    gap="xs"
                    style={{
                      opacity: hoveredNoteId === x.id ? 1 : 0,
                      visibility: hoveredNoteId === x.id ? "visible" : "hidden",
                      transition: "opacity 0.2s ease, visibility 0.2s ease",
                    }}
                  >
                    <Popover
                    aria-label="Remover cor"
                      opened={openedColorPaletteId === x.id}
                      onDismiss={() => setOpenedColorPaletteId(null)}
                      position="bottom-start"
                      withArrow
                      shadow="md"
                    >
                      <Popover.Target>
                        <Tooltip label="Escolher cor" withArrow>
                          <ActionIcon
                            variant="subtle"
                            color="gray"
                            radius="xl"
                            aria-label="Escolher cor de fundo"
                            style={{
                              color: getNoteIconColor(x.backgroundColor),
                              "--ai-hover": "var(--mantine-color-red-6)",
                              "--ai-hover-color": "#ffffff",
                            }}
                            onClick={() =>
                              setOpenedColorPaletteId((current) =>
                                current === x.id ? null : x.id,
                              )
                            }
                          >
                            <PaletteIcon size={18} />
                          </ActionIcon>
                        </Tooltip>
                      </Popover.Target>
                      <Popover.Dropdown>
                        <Group gap="xs">
                          {noteColors.map((color) => (
                            <ActionIcon
                              key={color}
                              variant="filled"
                              radius="xl"
                              onClick={() => handleUpdateNoteColor(x.id, color)}
                              aria-label={`Selecionar cor ${color}`}
                              style={{
                                backgroundColor: color,
                                border: "1px solid #d0d0d0",
                              }}
                            />
                          ))}
                        </Group>
                      </Popover.Dropdown>
                    </Popover>
                    {x.backgroundColor && (
                      <Tooltip label="Remover cor" withArrow>
                        <ActionIcon
                          variant="subtle"
                          color="gray"
                          radius="xl"
                          style={{
                            color: getNoteIconColor(x.backgroundColor),
                            "--ai-hover": "var(--mantine-color-red-6)",
                            "--ai-hover-color": "#ffffff",
                          }}
                          onClick={() => handleClearNoteColor(x.id)}
                          aria-label="Remover cor de fundo"
                        >
                          <XIcon size={18} />
                        </ActionIcon>
                      </Tooltip>
                    )}
                    <Tooltip label="Excluir nota" withArrow>
                      <ActionIcon
                        variant="subtle"
                        color="gray"
                        radius="xl"
                        style={{
                          color: getNoteIconColor(x.backgroundColor),
                          "--ai-hover": "var(--mantine-color-red-6)",
                          "--ai-hover-color": "#ffffff",
                        }}
                        onClick={() => deleteNote(x.id)}
                        aria-label="Excluir nota"
                      >
                        <TrashIcon size={18} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Group>
              </Collapse>
            </Paper>
          );
        })}
      </Flex>
    </Stack>
  );
}