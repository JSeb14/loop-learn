import { useCallback } from "react";
import useSetStore from "../stores/setStore";

export function useSets() {
  const { sets, setSets } = useSetStore();

  const loadSets = useCallback(async () => {
    try {
      const response = await fetch("/api/sets");
      const data = await response.json();

      setSets(data);
      return data;
    } catch (error) {
      console.error("Failed to load sets:", error);
      return [];
    }
  }, [setSets]);

  return {
    sets,
    setSets,
    loadSets,
  };
}
