"use client";

import { FlashcardSet, useFlashcardStore } from "@/app/util/flashcardStore";
import { createClient } from "@/lib/supabase/client";
import { Dispatch, SetStateAction, useState } from "react";

export default function UpdateSet({
  set,
  setIsUpdating,
}: {
  set: FlashcardSet;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
}) {
  const [name, setName] = useState(set?.name);
  const [description, setDescription] = useState(set?.description);
  const [isPrivate, setIsPrivate] = useState(true);
  const [subject, setSubject] = useState(set?.subject);
  //const [coverImage, setCoverImage] = useState(null);

  const setSetInfo = useFlashcardStore((s) => s.setSetInfo);

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

  async function update() {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("flashcard_set")
      .update({
        name: name,
        description: description,
        isPrivate: isPrivate,
        subject: subject,
      })
      .eq("id", set.id)
      .select();

    if (!data || error) {
      console.log(error);
      return;
    }

    const updatedSet: FlashcardSet = data[0];
    setSetInfo(updatedSet);
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
