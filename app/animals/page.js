"use client";

import { useEffect, useState } from "react";
import AnimalCard from "@/components/AnimalCard";
import Loading from "@/components/Loading";

export default function AllAnimalsPage() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    setLoading(true);
    const query = sort === "default" ? "" : `?sort=${sort}`;
    fetch(`/api/animals${query}`)
      .then((res) => res.json())
      .then((data) => setAnimals(data))
      .finally(() => setLoading(false));
  }, [sort]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl text-text">All Animals</h1>
          <p className="mt-2 text-sm text-text-muted">
            {loading ? "Fetching listings..." : `${animals.length} animals available for this season`}
          </p>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-fit rounded-full border border-border bg-surface px-4 py-2 text-sm text-text outline-none"
        >
          <option value="default">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="mt-10">
        {loading ? (
          <Loading label="Loading animals..." />
        ) : animals.length === 0 ? (
          <p className="text-text-muted">No animals found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {animals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
