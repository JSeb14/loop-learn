import { useCallback } from "react";
import useSetStore from "../stores/setStore";

export function useSets() {
  const { sets, setSets } = useSetStore();

  const loadSets = useCallback(async () => {
    const response = await fetch("/api/sets");
    
    if (!response.ok) {
      throw new Error("Failed to load sets");
    }
    
    const data = await response.json();
    setSets(data);
    return data;
  }, [setSets]);

  return {
    sets,
    setSets,
    loadSets,
  };
}
