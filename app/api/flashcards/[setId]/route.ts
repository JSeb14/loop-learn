import { getCardsBySet } from "@/app/controllers/flashcards/flashcards_controller";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { setId: string } }
) {
  try {
    const { data, error } = await getCardsBySet(params.setId);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
