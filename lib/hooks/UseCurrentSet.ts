import { useCallback } from "react";
import UseSelectedSetStore from "../stores/CurrentSetStore";

export function useCurrentSet() {
  const { currentSet, setCurrentSet } = UseSelectedSetStore();

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
