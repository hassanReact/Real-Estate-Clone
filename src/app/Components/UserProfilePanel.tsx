'use client'
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User as NextUser, // Renamed import to avoid conflict
} from "@nextui-org/react";
import { User as PrismaUser } from '@prisma/client'; // Renamed import
import Link from "next/link";

interface Props {
  user: PrismaUser; // Use renamed type here
}

const UserProfilePanel = ({ user }: Props) => {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <NextUser
          as="button"
          avatarProps={{
            isBordered: true,
            src: user.avatarUrl || "/Profile.jpg",
          }}
          className="transition-transform"
          description={`@${user.firsName}`} 
          name={`${user.firsName} ${user.lastName}`} 
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="User Actions" variant="flat">
        {/* Ensure unique keys for each DropdownItem */}
        <DropdownItem key="profile">
          <Link href={"/user/profile"}>
            Profile
          </Link>
        </DropdownItem>
        <DropdownItem key="properties">
          <Link href={"/user/properties"}>
            Properties
          </Link>
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          <LogoutLink>
            Log Out
          </LogoutLink>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default UserProfilePanel;
