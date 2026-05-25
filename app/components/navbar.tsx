'use client'

import { NavLink } from "@mantine/core";

interface MenuItem {
  name: string;
  icon: any;
  router: string
}

interface HeaderProps {
    optionsMenu: MenuItem[];
    onNavigate: (path: string) => void;
}

export default function Navbar({optionsMenu, onNavigate}:HeaderProps) {
    

    return (
        <>
        {  optionsMenu.map((x) => {
            const IconComponent = x.icon

            return (
                <NavLink
                    key={x.router}
                    href="#required-for-focus"
                    label={x.name}
                    leftSection={< IconComponent size={20} />}
                    onClick={() => onNavigate(x.router)}
                    variant="subtle"
                    active
                />
            )}
        )}
        </>
    )
}   