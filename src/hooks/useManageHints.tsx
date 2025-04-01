"use client";
import { defaultHints as defaultHintsMock } from "@/app/temporary/data";
import { useState, useEffect } from "react";

export interface IHint {
  id: number;
  hint: string;
  isUsed: boolean;
}

const defaultHints = defaultHintsMock; // TODO - Remove this once the API is ready

const useManageHints = () => {
  const [hints, setHints] = useState<IHint[]>(() => {
    const storedHints = localStorage.getItem("hints");
    return storedHints ? JSON.parse(storedHints) : [];
  });
  const [selectedHint, setSelectedHint] = useState<IHint | null>(null);

  const resetHints = () => {
    setHints(defaultHints); // TODO - Remove this once the API is ready
  };

  const setHintUsed = (id: number) => {
    setHints((prevHints) => prevHints.map((hint) => (hint.id === id ? { ...hint, isUsed: true } : hint)));
  };

  const selectHint = (id: number) => {
    const hint = hints.find((hint) => hint.id === id);
    if (hint) {
      setSelectedHint(hint);
    }
  };

  useEffect(() => {
    localStorage.setItem("hints", JSON.stringify(hints));
  }, [hints]);

  useEffect(() => {
    if (hints?.length === 0) {
      setHints(defaultHints); // TODO - Remove this once the API is ready
    }
  }, []);

  return {
    hints,
    setHints,
    setHintUsed,
    resetHints,
    selectHint,
    selectedHint,
  };
};

export default useManageHints;
