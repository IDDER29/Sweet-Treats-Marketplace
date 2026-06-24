import { auth } from "@/auth";
import { UTApi } from "uploadthing/server";

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401 }
      );
    }

    const { fileId } = await req.json();
    if (!fileId) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing fileId" }),
        { status: 400 }
      );
    }

    const utapi = new UTApi();
    await utapi.deleteFiles([fileId]);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Failed to delete file" }),
      { status: 500 }
    );
  }
}
