import { useCallback } from "react";
import useCurrentSetStore from "../stores/currentSetStore";

export function useCurrentSet() {
  const { currentSet, setCurrentSet } = useCurrentSetStore();

  const getSet = useCallback(
    async (id: string) => {
      const response = await fetch(`/api/sets/${id}`);
      
      if (!response.ok) {
        throw new Error("Failed to load set");
      }
      
      const data = await response.json();
      setCurrentSet(data);
      return data;
    },
    [setCurrentSet]
  );

  return {
    currentSet: currentSet,
    setCurrentSet,
    getSet,
  };
}
