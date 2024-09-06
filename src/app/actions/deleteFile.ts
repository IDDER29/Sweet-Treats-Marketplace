// app/actions/deleteFile.ts
"use server";
import { utapi } from "@/utils/uploadthing";

export async function deleteFile(fileId: string) {
  try {
    await utapi.deleteFiles([fileId]);
    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false };
  }
}
