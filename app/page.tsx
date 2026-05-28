"use client";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./components/header";
import Navbar from "./components/navbar";
import {
  BellSimpleRingingIcon,
  FileArrowDownIcon,
  LightbulbFilamentIcon,
  NotePencilIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Reminder from "./reminder/page";
import File from "./file/page";
import Trash from "./trash/trash";
import Note from "./note/page";
import EditNote from "./editNote/page";

export default function Home() {
  const [opened, { toggle }] = useDisclosure(true);
  const optionsMenu = [
    {
      name: "Notas",
      icon: LightbulbFilamentIcon,
      router: "/note",
    },
    {
      name: "Lembretes",
      icon: BellSimpleRingingIcon,
      router: "/reminder",
    },
    {
      name: "Editar marcadores",
      icon: NotePencilIcon,
      router: "/editNote",
    },
    {
      name: "Arquivo",
      icon: FileArrowDownIcon,
      router: "/file",
    },
    {
      name: "Lixeira",
      icon: TrashIcon,
      router: "/trash",
    },
  ];
  const [currentTab, setCurrentTab] = useState("/note");
  const handleNavigate = (tabId: string) => {
    setCurrentTab(tabId);
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "xl",
        collapsed: { mobile: !opened, desktop: !opened },
      }}
    >
      <AppShell.Header>
        <Header opened={opened} onToggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar optionsMenu={optionsMenu} onNavigate={handleNavigate} />
      </AppShell.Navbar>

      <AppShell.Main>
        {currentTab === "/note" && <Note />}
        {currentTab === "/reminder" && <Reminder />}
        {currentTab === "/editNote" && <EditNote />}
        {currentTab === "/file" && <File />}
        {currentTab === "/trash" && <Trash />}
      </AppShell.Main>
    </AppShell>
  );
}
