"use client";

import { createSet } from "@/lib/services/sets/setService";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetFormValues, setSchema } from "@/lib/schemas/setSchema";
import FlashcardSet from "@/lib/types/FlashcardSet";
import { useCurrentSet } from "@/lib/hooks/useCurrentSet";

const SetForm = ({
  set,
  setId,
  setIsUpdating,
  from,
}: {
  set: FlashcardSet | null;
  setId: string | null;
  setIsUpdating: Dispatch<SetStateAction<boolean>> | null;
  from: "create" | "update";
}) => {
  const { setCurrentSet } = useCurrentSet();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetFormValues>({
    resolver: zodResolver(setSchema),
    mode: "all",
    defaultValues: {
      name: set ? set.name : "",
      description: set ? set.description : "",
      isPrivate: set ? set.isPrivate : true,
      subject: set ? set.subject : "Select a Subject",
    },
  });

  const router = useRouter();

  const subjects = [
    "Select a Subject",
    "Anatomy",
    "Biology",
    "Chemistry",
    "English",
    "Foreign Language",
    "Geography",
    "History",
    "Math",
    "Other",
    "Social Studies",
    "Technology",
  ];

  const onSubmit = (data: SetFormValues) => {
    if (from === "create") {
      createSet(router, {
        ...data,
        description: !data.description ? null : data.description,
        subject:
          !data.subject || data.subject === "Select a Subject"
            ? null
            : data.subject,
      });
    } else if (from === "update" && setId) {
      update(data);
    }
  };

  async function update(form: SetFormValues) {
    if (setIsUpdating) setIsUpdating(true);
    try {
      const response = await fetch(`/api/sets/${setId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          isPrivate: form.isPrivate,
          subject: form.subject,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating set:", errorData);
        return;
      }

      const data = await response.json();
      const updatedSet: FlashcardSet = data;
      setCurrentSet(updatedSet);
      if (setIsUpdating) setIsUpdating(false);
    } catch (error) {
      console.error("Failed to update set:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-max mt-5 flex flex-col gap-7">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >
            Set Name
          </label>
          <input
            placeholder="Set name"
            type="text"
            id="name"
            {...register("name")}
            className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >
            Set Description
          </label>
          <input
            placeholder="Set description"
            type="text"
            id="description"
            {...register("description")}
            className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-white-900 dark:text-white mb-2"
          >
            Select a Subject for this Set
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
            {...register("subject")}
          >
            {subjects.map((subjectOption, index) => {
              return (
                <option value={subjectOption} key={`subject-${index}`}>
                  {subjectOption}
                </option>
              );
            })}
          </select>
          {errors.subject && (
            <p className="mt-1 text-xs text-red-500">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div className="flex flex-row gap-2 items-center">
          <label
            htmlFor="isPrivate"
            className="block text-sm font-medium text-white-900 dark:text-white"
          >
            Mark Set as Private?
          </label>
          <input
            type="checkbox"
            id="isPrivate"
            {...register("isPrivate")}
            className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
          />
          {errors.isPrivate && (
            <p className="mt-1 text-xs text-red-500">
              {errors.isPrivate.message}
            </p>
          )}
        </div>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-3" />

        <button
          type="submit"
          className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
        >
          {from === "create" ? "Create New Set" : "Update Set"}
        </button>
        {from === "update" && setIsUpdating && (
          <button
            className="w-bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
            onClick={() => {
              setIsUpdating(false);
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default SetForm;
