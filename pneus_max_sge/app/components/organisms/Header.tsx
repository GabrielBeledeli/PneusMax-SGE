"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/app/components/atoms/Logo";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import { ThemeSwitcher } from "@/app/components/atoms/ThemeSwitcher";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/cadastro", label: "Cadastro" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/log", label: "Log" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-surface-dark px-5 py-4 text-text-light shadow-md">
      <Link href="/home" className="flex flex-col items-center text-center gap-1">
        <Logo 
          src="/assets/logo3.png"
          alt="PneusMax Logo" 
          width={400} 
          height={100}
          className="w-40" 
        />
        <h2 className="hidden text-xs font-medium md:block">
          Gerenciamento de Estoque
        </h2>
      </Link>

      <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <ul className="flex items-center gap-6 md:gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-base font-semibold transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-text-light"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <div className="text-right">
          <p className="text-sm font-semibold">App Engs</p>
          <p className="text-xs text-gray-400">Admin</p>
        </div>
        <Image
          src="/assets/perfil.png"
          alt="Foto do Perfil"
          width={40}
          height={40}
          className="rounded-full"
        />
        <Link href="/" className="text-sm font-medium text-red-500 hover:text-red-400">
          Sair
        </Link>
      </div>
    </header>
  );
}
