import Link from "next/link";
import animals from "@/data/animals.json";
import AnimalCard from "@/components/AnimalCard";
import HeroCTA from "@/components/HeroCTA";
import { HiOutlineShieldCheck, HiOutlineTruck, HiOutlineCash } from "react-icons/hi";

const tips = [
  {
    title: "Check the teeth",
    body: "A healthy Qurbani animal usually has two permanent front teeth (dant), a simple sign of maturity sellers should be able to show you.",
  },
  {
    title: "Watch how it moves",
    body: "An active animal that walks and breathes normally, without limping or heavy panting, is a good sign of health.",
  },
  {
    title: "Ask for feeding history",
    body: "Naturally fed animals with a documented diet are generally healthier than those fattened quickly with steroids.",
  },
];

const breeds = [
  { name: "Deshi", note: "Local, lean, easy to manage" },
  { name: "Sirohi", note: "Popular premium goat breed" },
  { name: "Friesian Cross", note: "Large size, high yield" },
  { name: "Black Bengal", note: "Tender meat, compact size" },
];

const steps = [
  {
    icon: HiOutlineShieldCheck,
    title: "Browse verified listings",
    body: "Every animal on QurbaniHat comes with clear details — breed, weight, age and location — so you know exactly what you're booking.",
  },
  {
    icon: HiOutlineCash,
    title: "Book with confidence",
    body: "Log in, open any animal's page, and fill a short booking form. No hidden charges, no middleman haggling.",
  },
  {
    icon: HiOutlineTruck,
    title: "Coordinate delivery",
    body: "Once booked, our team reaches out to arrange safe delivery or pickup near your area before Eid.",
  },
];

export default function HomePage() {
  const featured = animals.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
          <div className="animate__animated animate__fadeInUp">
            <p className="text-sm tracking-wide text-accent">Qurbani season, simplified</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] text-text sm:text-5xl">
              Find the right animal for your Qurbani, without the haat crowd.
            </h1>
            <p className="mt-5 max-w-md text-text-muted">
              QurbaniHat brings verified cows, goats and sheep from trusted
              farms straight to your screen — compare, choose, and book in
              minutes.
            </p>
            <HeroCTA />
          </div>

          <div className="animate__animated animate__fadeIn relative h-72 overflow-hidden rounded-3xl border border-border sm:h-96">
            <img
              src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=1400&auto=format&fit=crop"
              alt="Cow for Qurbani"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl text-text sm:text-3xl">Featured animals</h2>
          <Link href="/animals" className="text-sm text-accent hover:underline">
            View all &rarr;
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </section>

      {/* How it works - extra section */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-2xl text-text sm:text-3xl">How QurbaniHat works</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="rounded-2xl border border-border bg-bg p-6">
                <step.icon className="text-2xl text-accent" />
                <h3 className="mt-4 font-display text-lg text-text">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qurbani Tips */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-2xl text-text sm:text-3xl">Qurbani tips</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {tips.map((tip, i) => (
            <div key={i} className="rounded-2xl border border-border p-6">
              <p className="font-display text-3xl text-accent">{`0${i + 1}`}</p>
              <h3 className="mt-3 text-base text-text">{tip.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{tip.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top breeds */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-2xl text-text sm:text-3xl">Top breeds this season</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {breeds.map((b, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-bg px-5 py-6 transition-colors hover:border-accent"
              >
                <p className="font-display text-lg text-text">{b.name}</p>
                <p className="mt-1 text-sm text-text-muted">{b.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
