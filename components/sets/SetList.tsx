"use client";

import Link from "next/link";
import Image from "next/image";
import delete_icon from "@/app/assets/icons/delete.svg";
import FlashcardSet from "@/lib/types/FlashcardSet";
import add_circle from "@/app/assets/icons/add_circle.svg";
import { useEffect } from "react";
import { useSets } from "@/lib/hooks/useSets";
import { deleteSet } from "@/lib/services/sets/setService";

export default function FlashcardSetList({
  initialSets,
}: {
  initialSets: FlashcardSet[] | null;
}) {
  const { sets, setSets, loadSets } = useSets();

  useEffect(() => {
    if (initialSets) setSets(initialSets);
    else loadSets();
  }, [loadSets, initialSets, setSets]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient mb-4">
            Your Flashcard Sets
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Organize your learning with beautifully crafted flashcard sets. 
            Create, study, and master any subject.
          </p>
        </div>

        {/* Create New Set Button */}
        <div className="flex justify-center mb-12">
          <Link 
            href="/protected/sets/create"
            className="btn-primary inline-flex items-center gap-3 group"
          >
            <span className="text-lg">Create New Set</span>
            <div className="bg-white/20 rounded-full p-2 group-hover:bg-white/30 transition-colors duration-200">
              <Image 
                src={add_circle} 
                width={20} 
                height={20} 
                alt="Create flashcard set"
                className="filter brightness-0 invert"
              />
            </div>
          </Link>
        </div>

        {/* Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sets && sets.length > 0 ? (
            sets.map((set: FlashcardSet, index) => (
              <div
                key={set.id || index}
                className="card-modern group hover:border-primary/20 p-6 relative overflow-hidden"
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                        {set.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {set.description || "No description available"}
                      </p>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          window.confirm(
                            "Are you sure you'd like to delete this set?"
                          )
                        ) {
                          deleteSet(set.id).then((response) => {
                            if (response.ok) {
                              const updatedSets = sets.filter(
                                (s) => s.id !== set.id
                              );
                              setSets(updatedSets);
                            } else {
                              alert("Failed to delete set.");
                            }
                          });
                        }
                      }}
                      className="p-2 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all duration-200 group/delete"
                      title="Delete set"
                    >
                      <Image 
                        src={delete_icon} 
                        width={16} 
                        height={16}
                        alt="Delete set"
                        className="group-hover/delete:filter group-hover/delete:brightness-0 group-hover/delete:sepia group-hover/delete:hue-rotate-[315deg] group-hover/delete:saturate-[5] transition-all duration-200"
                      />
                    </button>
                  </div>

                  {/* Card footer with stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        {set.subject || "General"}
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        Study
                      </span>
                    </div>
                    
                    {/* Link overlay */}
                    <Link 
                      href={`/protected/sets/${set.id}`}
                      className="text-primary hover:text-accent font-medium text-sm transition-colors duration-200"
                    >
                      Open →
                    </Link>
                  </div>
                </div>

                {/* Full card click area */}
                <Link 
                  href={`/protected/sets/${set.id}`}
                  className="absolute inset-0 z-0"
                  aria-label={`Open ${set.name} flashcard set`}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image 
                    src={add_circle} 
                    width={32} 
                    height={32}
                    alt="No sets"
                    className="opacity-50"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No flashcard sets yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Create your first flashcard set to start learning!
                </p>
                <Link 
                  href="/protected/sets/create"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Image 
                    src={add_circle} 
                    width={16} 
                    height={16}
                    alt="Create"
                    className="filter brightness-0 invert"
                  />
                  Create Your First Set
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
