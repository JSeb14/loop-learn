import { useCallback } from "react";
import useSelectedSetStore from "../stores/currentSetStore";

export function useCurrentSet() {
  const { currentSet, setCurrentSet } = useSelectedSetStore();

  const getSet = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(`/api/sets/${id}`);
        const data = await response.json();

        setCurrentSet(data);
        return data;
      } catch (error) {
        console.error(`Failed to load set ${id}:`, error);
        return null;
      }
    },
    [setCurrentSet]
  );

  return {
    currentSet: currentSet,
    setCurrentSet,
    getSet,
  };
}
