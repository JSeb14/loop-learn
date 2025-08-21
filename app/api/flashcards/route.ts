import { createCard } from "@/app/controllers/flashcards/flashcards_controller";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await createCard(body);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}