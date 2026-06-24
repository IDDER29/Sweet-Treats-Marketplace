// app/actions/deleteFile.ts

export async function deleteFile(fileId: string) {
  try {
    const response = await fetch("/api/deleteFile", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileId }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Unknown error");
    }

    return { success: true };
  } catch {
    return { success: false };
  }
}
