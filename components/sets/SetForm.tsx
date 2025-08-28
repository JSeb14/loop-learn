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
  onCancelClick,
  from,
}: {
  set: FlashcardSet | null;
  setId: string | null;
  setIsUpdating: Dispatch<SetStateAction<boolean>> | null;
  onCancelClick: () => void;
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
      throw new Error(errorData.message || "Failed to update the set.");
    }

    const data = await response.json();
    const updatedSet: FlashcardSet = data;
    setCurrentSet(updatedSet);
    if (setIsUpdating) setIsUpdating(false);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            {from === "create"
              ? "Create New Flashcard Set"
              : "Update Set Details"}
          </h2>
          <p className="text-muted-foreground">
            {from === "create"
              ? "Build a new study set to organize your learning materials"
              : "Modify your flashcard set information"}
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Set Name <span className="text-destructive">*</span>
          </label>
          <input
            placeholder="Enter a descriptive name for your set"
            type="text"
            id="name"
            {...register("name")}
            className="input-modern w-full focus-ring"
          />
          {errors.name && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <span className="w-1 h-1 bg-destructive rounded-full" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-foreground"
          >
            Description
          </label>
          <textarea
            placeholder="Briefly describe what this set covers (optional)"
            id="description"
            rows={3}
            {...register("description")}
            className="input-modern w-full resize-none focus-ring"
          />
          {errors.description && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <span className="w-1 h-1 bg-destructive rounded-full" />
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-sm font-medium text-foreground"
          >
            Subject Category
          </label>
          <div className="relative">
            <select
              {...register("subject")}
              className="input-modern w-full appearance-none cursor-pointer focus-ring pr-10"
            >
              {subjects.map((subjectOption, index) => (
                <option value={subjectOption} key={`subject-${index}`}>
                  {subjectOption}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          {errors.subject && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <span className="w-1 h-1 bg-destructive rounded-full" />
              {errors.subject.message}
            </p>
          )}
        </div>

        <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="isPrivate"
              {...register("isPrivate")}
              className="mt-1 w-4 h-4 text-primary bg-background border-border rounded focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            />
            <div className="flex-1 space-y-1">
              <label
                htmlFor="isPrivate"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Make this set private
              </label>
              <p className="text-xs text-muted-foreground">
                Private sets are only visible to you. Public sets can be
                discovered by other users.
              </p>
            </div>
          </div>
          {errors.isPrivate && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <span className="w-1 h-1 bg-destructive rounded-full" />
              {errors.isPrivate.message}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
          <div className="flex flex-col gap-4 w-full">
            <button
              type="submit"
              className="btn-primary flex-1 order-1 sm:order-2"
            >
              {from === "create" ? "Create Set" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onCancelClick}
              className="btn-secondary flex-1 order-1 sm:order-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SetForm;
