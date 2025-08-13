"use client";

import {
  FlashcardSet,
  Flashcard,
  useFlashcardStore,
} from "@/app/util/flashcardStore";
import { createClient } from "@/lib/supabase/client";
import { ReactElement, useEffect, useState } from "react";
import add_icon from "@/app/assets/add_icon.svg";
import Image from "next/image";
import check_icon from "@/app/assets/check_icon.svg";
import edit_icon from "@/app/assets/edit_doc_icon.svg";
import { useParams } from "next/navigation";
import edit_icon2 from "@/app/assets/edit_icon.svg";

export default function Set() {
  const setSetInfo = useFlashcardStore((state) => state.setSetInfo);
  const setInfo: FlashcardSet = useFlashcardStore((state) => state.setInfo);
  const setFlashcards = useFlashcardStore((state) => state.setFlashcards);
  const flashcards: Flashcard[] = useFlashcardStore(
    (state) => state.flashcards
  );

  const params = useParams<{ id: string }>();
  const setId = params.id;

  const [isAdding, setIsAdding] = useState(false);
  const [isUpdatingSet, setIsUpdatingSet] = useState(false);

  useEffect(() => {
    fetchData(setId);
  }, []);

  const fetchData = async (setId: string) => {
    const supabase = await createClient();

    const { data: flashcard_set, error: setError } = await supabase
      .from("flashcard_set")
      .select("*")
      .eq("id", setId)
      .limit(1);
    if (!flashcard_set || setError) {
      console.log("Error loading set details");
      return;
    }

    setSetInfo(flashcard_set[0]);

    const { data: flashcards, error } = await supabase
      .from("flashcard")
      .select("*")
      .eq("set_id", setId);
    if (error) {
      console.log("Error loading set details");
    }
    setFlashcards(flashcards);
  };

  const CreateCard = () => {
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    async function postCard() {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("flashcard")
        .insert([{ set_id: setId, front: front, back: back }])
        .select();

      if (!data || error) {
        console.log(error);
        return;
      }

      const newCard: Flashcard = data[0];
      setFlashcards([...flashcards, newCard]);
      setIsAdding(false);
    }

    return (
      <div className="bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 text-center w-full">
        <div className="flex flex-col gap-1 bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
          <label htmlFor="front">Card Front</label>
          <input
            value={front}
            type="text"
            placeholder="Card front..."
            onChange={(e) => {
              setFront(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col text-gray-400 mt-2 gap-1">
          <label htmlFor="back">Card Back</label>
          <input
            value={back}
            type="text"
            placeholder="Card back..."
            onChange={(e) => {
              setBack(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-row justify-evenly mt-5">
          <button onClick={postCard}>
            <div className="flex flex-row gap-2">
              <p>Confirm</p>
              <Image src={check_icon} alt="Create card" />
            </div>
          </button>
          <button
            onClick={() => {
              setIsAdding(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const UpdateSet = (): ReactElement => {
    const [name, setName] = useState(setInfo.name);
    const [description, setDescription] = useState(setInfo.description);
    const [isPrivate, setIsPrivate] = useState(true);
    const [subject, setSubject] = useState(setInfo.subject);
    //const [coverImage, setCoverImage] = useState(null);

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
        .eq("id", setId)
        .select();

      if (!data || error) {
        console.log(error);
        return;
      }

      const updatedSet: FlashcardSet = data[0];
      setSetInfo(updatedSet);
      setIsUpdatingSet(false);
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
              setIsUpdatingSet(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };

  const Flashcard = ({ card }: { card: Flashcard }) => {
    const [front, setFront] = useState(card.front);
    const [back, setBack] = useState(card.back);
    const [isEditing, setIsEditing] = useState(false);

    async function updateCard() {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("flashcard")
        .update({
          front: front,
          back: back,
        })
        .eq("id", card.id)
        .select();

      if (!data || error) {
        console.log(error);
        return;
      }

      const updatedCard: Flashcard = data[0];
      const cardSet = flashcards.filter((card) => card.id != updatedCard.id);
      setFlashcards([...cardSet, updatedCard]);
      setIsEditing(false);
    }

    return (
      <>
        {!isEditing ? (
          <div className="flex flex-row w-full gap-3">
            <div className="bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 text-center w-full">
              <h3 className="bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
                {card?.front}
              </h3>
              <h3 className="text-gray-400 mt-2">{card?.back}</h3>
            </div>
            <button
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <Image src={edit_icon2} alt="Edit card" width={30} />
            </button>
          </div>
        ) : (
          <>
            <div className="bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 text-center w-full">
              <div className="flex flex-col gap-1 bg-[#1E1E1E] rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <label htmlFor="front">Card Front</label>
                <input
                  value={front}
                  type="text"
                  placeholder="Card front..."
                  onChange={(e) => {
                    setFront(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col text-gray-400 mt-2 gap-1">
                <label htmlFor="back">Card Back</label>
                <input
                  value={back}
                  type="text"
                  placeholder="Card back..."
                  onChange={(e) => {
                    setBack(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-row justify-evenly mt-5">
                <button onClick={updateCard}>
                  <div className="flex flex-row gap-2">
                    <p>Confirm</p>
                    <Image src={check_icon} alt="Create card" />
                  </div>
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <>
        {!isUpdatingSet ? (
          <>
            <h1>{setInfo?.name}</h1>
            <h2>{setInfo?.description}</h2>
            <h3>{setInfo?.subject}</h3>
            <button
              className="flex flex-row gap-2 border-2 border-solid p-2"
              onClick={() => {
                setIsUpdatingSet(true);
              }}
            >
              <p>Edit Set Details</p>
              <Image src={edit_icon} alt="Edit set properties" />
            </button>
          </>
        ) : (
          <UpdateSet />
        )}
      </>

      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-4" />
      <div className="w-full flex flex-col gap-4">
        {flashcards.map((flashcard) => {
          return (
            <Flashcard key={`flashcard-${flashcard.id}`} card={flashcard} />
          );
        })}
      </div>
      <>
        {!isAdding ? (
          <button
            onClick={() => {
              setIsAdding(true);
            }}
          >
            <div className="flex flex-row gap-2 border-2 border-solid p-2">
              <p>Add flashcard</p>
              <Image src={add_icon} alt="Add new flashcard" />
            </div>
          </button>
        ) : (
          <CreateCard />
        )}
      </>
    </div>
  );
}
