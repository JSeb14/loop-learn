import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function createSet(
  router: AppRouterInstance,
  data: {
    name: string;
    description: string;
    isPrivate: boolean;
    subject: string;
  }
) {
  const response = await fetch("/api/sets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      description: data.description,
      isPrivate: data.isPrivate,
      subject: data.subject,
    }),
  });

  if (response.ok) {
    alert(`Your flashcard set was successfully created!`);
    router.push("/protected/sets");
  } else {
    const errorData = await response.json();
    alert(`Error: ${errorData.error}`);
  }
}

export async function deleteSet(setId: string) {
  const response = await fetch(`/api/sets/${setId}`, {
    method: "DELETE",
  });
  return response;
}
