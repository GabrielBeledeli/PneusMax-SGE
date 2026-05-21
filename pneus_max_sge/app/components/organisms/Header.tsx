"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/app/components/atoms/Logo";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import { ThemeSwitcher } from "@/app/components/atoms/ThemeSwitcher";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/cadastro", label: "Cadastro" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/log", label: "Log" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface-dark text-text-light shadow-md">
      <div className="flex items-center justify-between px-5 py-4">
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

        {/* Desktop nav */}
        <nav className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold">App Engs</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
          <Image
            src="/assets/perfil.png"
            alt="Foto do Perfil"
            width={40}
            height={40}
            className="rounded-full hidden md:block"
          />
          <Link
            href="/"
            className="hidden md:block text-sm font-medium text-red-500 hover:text-red-400"
          >
            Sair
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menu"
          >
            {menuOpen ? (
              <X className="h-6 w-6 text-text-light" />
            ) : (
              <Menu className="h-6 w-6 text-text-light" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="md:hidden bg-surface-darker px-5 pb-4">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block text-base font-semibold py-2 transition-colors hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-text-light"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/"
                className="block text-sm font-medium text-red-500 hover:text-red-400 py-2"
              >
                Sair
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
