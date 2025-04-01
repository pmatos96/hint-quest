"use client";
import React from "react";
import useManageLocalStorage from "@/hooks/useManageLocalStorage";
import { Stack } from "@mui/material";
import useManageGameStep from "@/hooks/useManageGameStep";
import CategorySelectionStep from "./components/steps/CategorySelectionStep";
import HintSelectionStep from "./components/steps/HintSelectionStep";
import GuessStep from "./components/steps/GuessStep";
import useManageHints from "@/hooks/useManageHints";

export default function Game() {
  const { gameCategory, setGameCategory } = useManageLocalStorage();
  const { currentStep, goToNextStep, goToPreviousStep, restartSteps } = useManageGameStep();
  const { hints, setHintUsed, resetHints, selectHint, selectedHint } = useManageHints();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CategorySelectionStep
            onSetCategory={(category) => {
              setGameCategory(category);
              goToNextStep();
            }}
          />
        );
      case 1:
        return (
          <HintSelectionStep
            hints={hints}
            onSelectHint={async (id) => {
              await setHintUsed(id);
              selectHint(id);
              goToNextStep();
            }}
            gameCategory={gameCategory}
            onRestart={async () => {
              await resetHints();
              restartSteps();
            }}
          />
        );
      case 2:
        return <GuessStep closeHint={goToPreviousStep} hintText={selectedHint?.hint!} />;
      default:
        return null;
    }
  };

  return <Stack width="100%">{renderStep()}</Stack>;
}
