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
          <p className="font-bold text-inherit">ZYCK Real Estate</p>
            </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {children}
      </NavbarContent>
    </Navbar>
  );
}

