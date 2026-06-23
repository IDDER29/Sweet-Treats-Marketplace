// app/api/deleteFile/route.ts
"use server";

import { UTApi } from "uploadthing/server";

export async function DELETE(req: Request) {
  try {
    // Parse the request to extract the fileId
    const { fileId } = await req.json();

    if (!fileId) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing fileId" }),
        { status: 400 }
      );
    }

    // Instantiate lazily so `next build` doesn't require the UploadThing key
    // at build time (the client validates the key in its constructor).
    const utapi = new UTApi();
    await utapi.deleteFiles([fileId]);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error deleting file:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to delete file" }),
      { status: 500 }
    );
  }
}
