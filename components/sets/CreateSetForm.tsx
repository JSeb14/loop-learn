"use client";

import { createSet } from "@/lib/services/sets/setService";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";

export const CreateSetForm = (): ReactElement => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [subject, setSubject] = useState("Anatomy");

  const router = useRouter();

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

  return (
    <form>
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
            htmlFor="subject"
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
          onClick={() => {
            createSet(router, {
              name,
              description,
              isPrivate,
              subject,
            });
          }}
          className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
        >
          Create New Set
        </button>
      </div>
    </form>
  );
};

export default CreateSetForm;
