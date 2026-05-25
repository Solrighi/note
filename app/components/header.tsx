'use client'

import { ActionIcon, Burger, Group, Text, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "@phosphor-icons/react";

interface HeaderProps {
  opened: boolean;
  onToggle: () => void;
}

export default function Header({opened, onToggle}:HeaderProps) {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme()
    const isDark = colorScheme === 'dark';

    return (
        <>
            <Group h="100%" px="md" justify="space-between">
                <Group>
                    <Burger opened={opened} onClick={onToggle} aria-label="Toggle navigation" />
                </Group>

                <ActionIcon
                    variant="outline"
                    color={isDark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title="Alternar tema"
                    size="lg"
                    radius="md"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </ActionIcon>
            </Group>
        </>
    )
}   