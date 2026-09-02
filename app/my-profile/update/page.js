"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession, authClient } from "@/lib/auth-client";
import Loading from "@/components/Loading";
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", image: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
    if (session?.user) {
      setForm({ name: session.user.name || "", image: session.user.image || "" });
    }
  }, [isPending, session, router]);

  if (isPending || !session?.user) {
    return <Loading label="Loading..." />;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    const { error } = await authClient.updateUser({
      name: form.name,
      image: form.image || undefined,
    });

    setSaving(false);

    if (error) {
      toast.error(error.message || "Could not update profile");
      return;
    }

    toast.success("Profile updated successfully");
    router.push("/my-profile");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-lg px-5 py-16">
      <Link href="/my-profile" className="mb-6 inline-flex items-center gap-2 text-sm text-text-muted hover:text-text">
        <HiOutlineArrowLeft /> Back to profile
      </Link>

      <div className="animate__animated animate__fadeInUp rounded-3xl border border-border bg-surface p-8">
        <h1 className="font-display text-2xl text-text">Update your info</h1>
        <p className="mt-1 text-sm text-text-muted">Change your display name or profile photo.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex justify-center">
            <img
              src={
                form.image ||
                `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(form.name || "U")}`
              }
              alt="preview"
              className="h-24 w-24 rounded-full border border-border object-cover"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-text-muted">Full name</label>
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-text-muted">Photo URL</label>
            <input
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none focus:border-accent"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-accent py-3 text-sm font-medium text-[#14110f] transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
