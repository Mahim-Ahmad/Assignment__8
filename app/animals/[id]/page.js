"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";
import Loading from "@/components/Loading";
import { HiOutlineLocationMarker, HiOutlineScale, HiOutlineCalendar } from "react-icons/hi";

export default function AnimalDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/animals/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then((data) => setAnimal(data))
      .catch(() => setAnimal(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (session?.user) {
      setForm((f) => ({
        ...f,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Please login to book this animal");
      router.push("/login");
      return;
    }

    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error("Please fill in every field");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      toast.success(`Booking request sent for ${animal.name}!`);
      setForm({ name: session.user.name || "", email: session.user.email || "", phone: "", address: "" });
      setSubmitting(false);
    }, 700);
  }

  if (loading || isPending) return <Loading label="Loading animal details..." />;

  if (!animal) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-display text-2xl text-text">Animal not found</h1>
        <p className="mt-2 text-text-muted">This listing may have been removed.</p>
        <Link href="/animals" className="mt-6 inline-block text-accent hover:underline">
          &larr; Back to all animals
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image + info */}
        <div className="animate__animated animate__fadeIn">
          <div className="overflow-hidden rounded-3xl border border-border">
            <img src={animal.image} alt={animal.name} className="h-96 w-full object-cover" />
          </div>

          <h1 className="mt-6 font-display text-3xl text-text">{animal.name}</h1>
          <p className="mt-1 text-text-muted">
            {animal.breed} &middot; {animal.type}
          </p>
          <p className="mt-4 font-display text-3xl text-accent">
            &#2547;{animal.price.toLocaleString("en-BD")}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-border p-4 text-center">
              <HiOutlineScale className="mx-auto text-xl text-accent" />
              <p className="mt-2 text-sm text-text">{animal.weight} kg</p>
            </div>
            <div className="rounded-xl border border-border p-4 text-center">
              <HiOutlineCalendar className="mx-auto text-xl text-accent" />
              <p className="mt-2 text-sm text-text">{animal.age} yrs</p>
            </div>
            <div className="rounded-xl border border-border p-4 text-center">
              <HiOutlineLocationMarker className="mx-auto text-xl text-accent" />
              <p className="mt-2 text-sm text-text">{animal.location}</p>
            </div>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-text-muted">{animal.description}</p>
        </div>

        {/* Booking form */}
        <div className="animate__animated animate__fadeInUp h-fit rounded-3xl border border-border bg-surface p-7">
          <h2 className="font-display text-xl text-text">Book this animal</h2>
          {!session?.user && !isPending && (
            <p className="mt-2 text-sm text-text-muted">
              You need to{" "}
              <Link href="/login" className="text-accent hover:underline">
                login
              </Link>{" "}
              before submitting a booking request.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm text-text-muted">Full name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-text-muted">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-text-muted">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                placeholder="01XXXXXXXXX"
                className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-text-muted">Delivery address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                placeholder="House, road, area, district"
                className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none focus:border-accent"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-accent py-3 text-sm font-medium text-[#14110f] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Confirm booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
