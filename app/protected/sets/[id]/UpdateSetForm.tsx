"use client";

import { useCurrentSet } from "@/lib/hooks/UseCurrentSet";
import FlashcardSet from "@/lib/types/FlashcardSet";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function UpdateSet({
  set,
  setId,
  setIsUpdating,
}: {
  set: FlashcardSet | null;
  setId: string;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
}) {
  const { currentSet, setCurrentSet, getSet } = useCurrentSet();

  useEffect(() => {
    if (!set) getSet(setId);
  }, [set, getSet, setId]);

  const [name, setName] = useState(currentSet?.name);
  const [description, setDescription] = useState(currentSet?.description);
  const [isPrivate, setIsPrivate] = useState(currentSet?.isPrivate);
  const [subject, setSubject] = useState(currentSet?.subject);

  const subjects = [
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

  async function update(e: React.FormEvent) {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/sets/${set.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          isPrivate,
          subject,
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
      setIsUpdating(false);
    } catch (error) {
      console.error("Failed to update set:", error);
    }
  }

  return (
    <form>
      <div className="w-max mt-5 flex flex-col gap-5">
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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
            required
          />
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
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
            required
          />
        </div>

        <div>
          <label
            htmlFor="isPrivate"
            className="block text-sm font-medium text-white-900 dark:text-white mb-2"
          >
            Select a Subject for this Set
          </label>
          <select
            name="subject"
            value={subject}
            className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          >
            {subjects.map((subjectOption, index) => {
              return (
                <option value={subjectOption} key={`subject-${index}`}>
                  {subjectOption}
                </option>
              );
            })}
          </select>
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
            checked={isPrivate}
            onChange={() => {
              setIsPrivate(!isPrivate);
            }}
            className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
          />
        </div>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-3" />

        <button
          type="submit"
          className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
          onClick={update}
        >
          Update Set
        </button>
        <button
          className="w-bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
          onClick={() => {
            setIsUpdating(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
