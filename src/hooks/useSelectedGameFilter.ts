import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type UseSelectedGameFilterResult = {
  selectedGameId: number | null;
  setSelectedGameId: (gameId: number | null) => void;
};

export function useSelectedGameFilter(): UseSelectedGameFilterResult {
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/reviews") {
      return;
    }

    const nextGameId = location.state?.selectedGameId ?? null;
    setSelectedGameId(nextGameId);
  }, [location.pathname, location.state?.selectedGameId]);

  return { selectedGameId, setSelectedGameId };
}
