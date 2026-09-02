import Link from "next/link";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function AnimalCard({ animal }) {
  return (
    <div className="group animate__animated animate__fadeIn overflow-hidden rounded-2xl border border-border bg-surface transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={animal.image}
          alt={animal.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-bg/80 px-3 py-1 text-xs text-accent backdrop-blur">
          {animal.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg leading-snug text-text">{animal.name}</h3>
        </div>
        <p className="mt-1 text-sm text-text-muted">
          {animal.breed} &middot; {animal.type}
        </p>

        <div className="mt-3 flex items-center gap-1 text-xs text-text-muted">
          <HiOutlineLocationMarker />
          {animal.location}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="font-display text-xl text-accent">
            &#2547;{animal.price.toLocaleString("en-BD")}
          </p>
          <Link
            href={`/animals/${animal.id}`}
            className="rounded-full border border-border px-4 py-2 text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
