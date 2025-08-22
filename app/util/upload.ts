export async function uploadImages(frontImage: File | null, backImage: File | null, setId: string) {
    let frontUrl = null;
    let backUrl = null;

    if (frontImage) {
      const formData = new FormData();
      formData.append("file", frontImage);
      formData.append("path", `set-${setId}/front/${frontImage.name}`);
      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        console.error("Error uploading front image");
      } else {
        frontUrl = `set-${setId}/front/${frontImage.name}`;
      }
    }

    if (backImage) {
      const formData = new FormData();
      formData.append("file", backImage);
      formData.append("path", `set-${setId}/back/${backImage.name}`);
      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        console.error("Error uploading back image");
      } else {
        backUrl = `set-${setId}/back/${backImage.name}`;
      }
    }

    return { frontUrl, backUrl };
  }