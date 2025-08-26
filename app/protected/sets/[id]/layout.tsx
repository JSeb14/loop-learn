"use client";

import Link from "next/link";
import Image from "next/image";
import back from "@/app/assets/icons/back.svg";
import stack from "@/app/assets/icons/stack.svg";
import quiz from "@/app/assets/icons/quiz.svg";
import manage from "@/app/assets/icons/manage.svg";
import star_icon from "@/app/assets/icons/star.svg";
import { useParams, usePathname } from "next/navigation";

export default function SetLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const path = usePathname();

  const items = [
    { label: "Back to Sets", link: "/protected/sets", icon: back },
    { label: "Manage Set", link: `/protected/sets/${id}`, icon: manage },
    { label: "Deck", link: `/protected/sets/${id}/deck`, icon: stack },
    {
      label: "Practice",
      link: `/protected/sets/${id}/practice`,
      icon: star_icon,
    },
    { label: "Quiz", link: `/protected/sets/${id}/quiz`, icon: quiz },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <nav className="bg-card/80 backdrop-blur-md border-b border-border/50 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-8">
            {items.map((nav, index) => {
              const isActive = path === nav.link;
              return (
                <Link 
                  key={index} 
                  href={nav.link}
                  className={`
                    group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }
                  `}
                >
                  <div className={`
                    w-5 h-5 transition-all duration-200 
                    ${isActive ? 'brightness-0 invert' : 'group-hover:scale-110'}
                  `}>
                    <Image 
                      src={nav.icon} 
                      alt={nav.label}
                      width={20}
                      height={20}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>
                    {nav.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </div>
    </div>
  );
}
