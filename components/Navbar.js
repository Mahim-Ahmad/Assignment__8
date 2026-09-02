"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const links = [
  { href: "/", label: "Home" },
  { href: "/animals", label: "All Animals" },
];

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-[15px] font-bold text-[#14110f]">
            Q
          </span>
          QurbaniHat
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-text-muted transition-colors hover:text-text"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {isPending ? null : session?.user ? (
            <div className="flex items-center gap-3">
              <Link href="/my-profile" className="flex items-center gap-2">
                <img
                  src={
                    session.user.image ||
                    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                      session.user.name || "U"
                    )}`
                  }
                  alt={session.user.name || "Profile"}
                  className="h-9 w-9 rounded-full border border-border object-cover"
                />
                <span className="text-sm text-text-muted">
                  {session.user.name?.split(" ")[0]}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full border border-border px-4 py-2 text-sm text-text-muted transition-colors hover:border-accent hover:text-text"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-text-muted transition-colors hover:text-text"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-[#14110f] transition-opacity hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="text-text md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="animate__animated animate__fadeIn border-t border-border px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-text-muted">
                {l.label}
              </Link>
            ))}
            {session?.user ? (
              <>
                <Link href="/my-profile" onClick={() => setOpen(false)} className="text-text-muted">
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="text-left text-text-muted"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="text-text-muted">
                  Login
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="text-accent">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
