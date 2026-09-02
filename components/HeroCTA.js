"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function HeroCTA() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="mt-8 flex flex-wrap gap-4">
        <div className="h-12 w-40 animate-pulse rounded-full bg-surface-2" />
        <div className="h-12 w-40 animate-pulse rounded-full bg-surface-2" />
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-wrap gap-4">
      <Link
        href="/animals"
        className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-[#14110f] transition-opacity hover:opacity-90"
      >
        Browse animals
      </Link>

      {session?.user ? (
        <Link
          href="/my-profile"
          className="rounded-full border border-border px-7 py-3 text-sm text-text transition-colors hover:border-accent hover:text-accent"
        >
          Go to my profile
        </Link>
      ) : (
        <Link
          href="/register"
          className="rounded-full border border-border px-7 py-3 text-sm text-text transition-colors hover:border-accent hover:text-accent"
        >
          Create an account
        </Link>
      )}
    </div>
  );
}
