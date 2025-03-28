"use client";
import React from "react";
import useManageLocalStorage from "@/hooks/useManageLocalStorage";
import { Stack } from "@mui/material";
import useManageGameStep from "@/hooks/useManageGameStep";
import CategorySelectionStep from "./components/steps/CategorySelectionStep";
import HintSelectionStep from "./components/steps/HintSelectionStep";

export default function Game() {
  const { gameCategory, setGameCategory } = useManageLocalStorage();
  const { currentStep, goToNextStep, restartSteps } = useManageGameStep();

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
        return <HintSelectionStep gameCategory={gameCategory} onRestart={restartSteps} />;
      default:
        return null;
    }
  };

  return <Stack width="100%">{renderStep()}</Stack>;
}
