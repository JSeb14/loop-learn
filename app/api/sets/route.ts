import { createSet, getAllSets } from "@/app/controllers/sets/sets_controller";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { sets, error } = await getAllSets();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(sets);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, error } = await createSet(body);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
