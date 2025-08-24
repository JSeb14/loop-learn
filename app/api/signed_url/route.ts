import { createSignedUrl } from "@/lib/controllers/signed_url/signedUrlController";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { path } = body;

    const { data, error } = await createSignedUrl(path);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
