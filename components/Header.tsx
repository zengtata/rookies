"use client";
import React from "react";
import Link from "next/link";
import { getInitials } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="my-10 flex justify-evenly gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={70} height={70}/>
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-dark-700">
                {getInitials(session?.user?.name || "QT")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;
