"use client";

import Link from "next/link";
import back_icon from "@/app/assets/back_icon.svg";
import Image from "next/image";
import stack_icon from "@/app/assets/stack_icon.svg";
import quiz_icon from "@/app/assets/quiz_icon.svg";
import manage_icon from "@/app/assets/quiz_icon.svg";
import { useParams, usePathname } from "next/navigation";

export default function SetLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const path = usePathname();

  const items = [
    { label: "Back", link: "/protected/sets", icon: back_icon },
    { label: "Manage Set", link: `/protected/sets/${id}`, icon: manage_icon },
    {
      label: "Practice",
      link: `/protected/sets/${id}/practice`,
      icon: stack_icon,
    },
    { label: "Quiz", link: `/protected/sets/${id}`, icon: quiz_icon },
  ];

  return (
    <div className="flex-1 w-full flex flex-col gap-10 items-center mb-5">
      <nav className="w-full flex flex-row justify-evenly border-b border-b-foreground/10 pb-2">
        {items.map((nav, index) => {
          const c = `flex flex-row gap-1 items-center ${
            path === nav.link ? "font-bold" : ""
          }`;
          return (
            <Link key={index} className={c} href={nav.link}>
              <Image src={nav.icon} alt={nav.label} />
              {nav.label}
            </Link>
          );
        })}
      </nav>
      <div className="w-full flex-1 flex flex-col gap-10 max-w-5xl p-5 items-center">
        {children}
      </div>
    </div>
  );
}
