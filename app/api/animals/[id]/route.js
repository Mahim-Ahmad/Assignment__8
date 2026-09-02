import { NextResponse } from "next/server";
import animals from "@/data/animals.json";

export async function GET(request, { params }) {
  const { id } = await params;
  const animal = animals.find((a) => String(a.id) === String(id));

  if (!animal) {
    return NextResponse.json({ error: "Animal not found" }, { status: 404 });
  }

  return NextResponse.json(animal);
}
