import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function createSet(
  router: AppRouterInstance,
  data: {
    name: string;
    description: string | null;
    isPrivate: boolean;
    subject: string | null;
  }
) {
  const response = await fetch("/api/sets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    alert(`Your flashcard set was successfully created!`);
    router.push("/protected/sets");
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create set");
  }
}

export async function deleteSet(setId: string) {
  const response = await fetch(`/api/sets/${setId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete set");
  }
  return response;
}
