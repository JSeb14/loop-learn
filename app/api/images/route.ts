import {
  deleteImage,
  uploadImage,
} from "@/app/controllers/images/image_controller";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const path = formData.get("path") as string;

    const { error } = await uploadImage(file, path);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Image uploaded successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 401 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    if (!body.paths || !Array.isArray(body.paths) || body.paths.length === 0) {
      return NextResponse.json(
        { error: "Paths are required" },
        { status: 400 }
      );
    }
    const { error } = await deleteImage(body.paths);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }
}
