"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import Loading from "@/components/Loading";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return <Loading label="Loading profile..." />;
  }

  const { user } = session;

  return (
    <div className="mx-auto max-w-lg px-5 py-16">
      <div className="animate__animated animate__fadeInUp rounded-3xl border border-border bg-surface p-8 text-center">
        <img
          src={
            user.image ||
            `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(user.name || "U")}`
          }
          alt={user.name}
          className="mx-auto h-28 w-28 rounded-full border border-border object-cover"
        />
        <h1 className="mt-5 font-display text-2xl text-text">{user.name}</h1>
        <p className="mt-1 text-sm text-text-muted">{user.email}</p>

        <Link
          href="/my-profile/update"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-[#14110f] transition-opacity hover:opacity-90"
        >
          Update Info
        </Link>
      </div>
    </div>
  );
}
