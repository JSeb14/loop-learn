"use client";

import { createSet } from "@/lib/services/sets/setService";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetFormValues, setSchema } from "@/lib/schemas/setSchema";

const CreateSetForm = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetFormValues>({
    resolver: zodResolver(setSchema),
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
      isPrivate: true,
      subject: "Select a Subject",
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
    createSet(router, {
      ...data,
      description: !data.description ? null : data.description,
      subject:
        !data.subject || data.subject === "Select a Subject"
          ? null
          : data.subject,
    });
  };

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
          Create New Set
        </button>
      </div>
    </form>
  );
};

export default CreateSetForm;
