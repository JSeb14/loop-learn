import { NextResponse } from "next/server";
import { deleteSet, updateSet } from "@/lib/controllers/sets/setsController";
import FlashcardSet from "@/lib/types/Flashcard";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const updates: Partial<FlashcardSet> = await req.json();

    const { data, error } = await updateSet(id, updates);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Set not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await deleteSet(id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
