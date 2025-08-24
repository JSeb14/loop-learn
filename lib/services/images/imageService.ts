/**
 * Deletes images from storage by their paths
 */
export async function deleteImages(paths: (string | null)[]): Promise<boolean> {
  const filteredPaths = paths.filter(Boolean);

  if (filteredPaths.length === 0) return true;

  try {
    const imgResponse = await fetch("/api/images", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paths: filteredPaths }),
    });

    if (!imgResponse.ok) {
      console.error("Error deleting images");
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error deleting images", err);
    return false;
  }
}

export async function uploadImages(
  frontImage: File | null,
  backImage: File | null,
  setId: string,
  uniqueId: string
) {
  let frontUrl = null;
  let backUrl = null;

  if (frontImage) {
    const formData = new FormData();
    formData.append("file", frontImage);
    formData.append(
      "path",
      `set-${setId}/front/${uniqueId}-${frontImage.name}`
    );
    const response = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      console.error("Error uploading front image");
    } else {
      frontUrl = `set-${setId}/front/${uniqueId}-${frontImage.name}`;
    }
  }

  if (backImage) {
    const formData = new FormData();
    formData.append("file", backImage);

    formData.append("path", `set-${setId}/back/${uniqueId}-${backImage.name}`);
    const response = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      console.error("Error uploading back image");
    } else {
      backUrl = `set-${setId}/back/${uniqueId}-${backImage.name}`;
    }
  }

  return { frontUrl, backUrl };
}
