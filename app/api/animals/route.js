import { NextResponse } from "next/server";
import animals from "@/data/animals.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get("sort");

  let result = [...animals];

  if (sort === "asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    result.sort((a, b) => b.price - a.price);
  }

  return NextResponse.json(result);
}
