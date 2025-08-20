import { getAllSets } from "@/app/controllers/sets/sets_controller";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await getAllSets();
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
