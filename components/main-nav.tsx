"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const navItems = [
  {
    title: "Inicio",
    href: "/",
  },
  {
    title: "Desayunos",
    href: "/desayunos",
  },
  {
    title: "Media Mañana",
    href: "/media-manana",
  },
  {
    title: "Comidas",
    href: "/comidas",
  },
  {
    title: "Meriendas",
    href: "/meriendas",
  },
  {
    title: "Cenas",
    href: "/cenas",
  },
  {
    title: "Recomendaciones",
    href: "/recomendaciones",
  },
  {
    title: "Planificador Semanal",
    href: "/planificador",
  },
];

export function MainNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center'>
        {/* Mobile Menu Button */}
        <Button
          variant='ghost'
          className='lg:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className='h-6 w-6' />
        </Button>

        {/* Desktop Menu */}
        <nav className='hidden lg:flex items-center space-x-6 overflow-x-auto'>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='fixed inset-x-0 top-[57px] z-50 lg:hidden'>
          <nav className='mx-auto bg-background border rounded-md p-4 shadow-lg container'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block w-full text-sm font-medium transition-colors hover:text-primary px-2 py-1.5 rounded-md hover:bg-muted",
                  pathname === item.href
                    ? "text-primary bg-muted"
                    : "text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
