"use client"
import React, { ReactNode } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  Link,
} from "@nextui-org/react";
import { HomeModernIcon } from "@heroicons/react/16/solid";

interface Props {
    children: ReactNode;
}


export default function Appbar({ children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar className="shadow-md" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
            <Link href={"/"} className="flex items-center text-primary-400 hover:text-primary-800 transition-colors gap-2">
            <HomeModernIcon className="w-16"/>
          <p className="font-bold text-inherit">HK Real Estate</p>
            </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {children}
      </NavbarContent>
      {/* <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu> */}
    </Navbar>
  );
}

