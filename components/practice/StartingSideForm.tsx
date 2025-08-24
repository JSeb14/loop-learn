"use client";

import { Dispatch, SetStateAction, useState } from "react";

export default function StartingSideForm({
  setStartFront,
  setSettingUp,
}: {
  setStartFront: Dispatch<SetStateAction<boolean>>;
  setSettingUp: Dispatch<SetStateAction<boolean>>;
}) {
  const [startingSide, setStartingSide] = useState("front");

  return (
    <form className="flex flex-col gap-2 items-center">
      <div className="flex flex-row gap-3 items-center">
        <label className="block text-lg font-medium text-white-900 dark:text-white mb-2">
          Flashcard Start Side
        </label>
        <select
          name="side"
          value={startingSide}
          onChange={(e) => {
            setStartingSide(e.target.value);
          }}
          className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-400"
        >
          <option value="front">Front</option>
          <option value="back">Back</option>
        </select>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-4" />

      <button
        onClick={() => {
          setStartFront(startingSide === "front");
          setSettingUp(false);
        }}
        className="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700"
      >
        Continue
      </button>
    </form>
  );
}
