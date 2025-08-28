import { useState, useEffect } from "react";
import signedUrlStore from "../stores/signedUrlStore";

export function useSignedUrl(path: string | null) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);

  const { getUrl, addUrl } = signedUrlStore();

  useEffect(() => {
    async function fetchUrl() {
      if (!path) {
        setUrl(null);
        return;
      }

      const cachedUrl = getUrl(path);
      if (cachedUrl) {
        setUrl(cachedUrl);
        return;
      }

      try {
        setIsLoading(true);

        const response = await fetch("/api/signed_url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ path }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch signed URL");
        }

        const data = await response.json();
        if (data?.signedUrl) {
          addUrl(path, data.signedUrl);
          setUrl(data.signedUrl);
        }
      } catch (err) {
        // Error will be caught by error boundary
        throw err;
      } finally {
        setIsLoading(false);
      }
    }

    fetchUrl();
  }, [path, getUrl, addUrl]);

  return { url, isLoading };
}
