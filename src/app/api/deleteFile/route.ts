// app/api/deleteFile/route.ts
"use server";

import { UTApi } from "uploadthing/server";

// Create an instance of the UploadThing API
const utapi = new UTApi();

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

    // Delete the file using UploadThing API
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
