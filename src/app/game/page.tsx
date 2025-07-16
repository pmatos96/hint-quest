"use client";
import React, { useEffect } from "react";
import useGameData from "@/hooks/useGameData";
import { Stack } from "@mui/material";
import useManageGameStep from "@/hooks/useManageGameStep";
import CategorySelectionStep from "./components/steps/CategorySelectionStep";
import HintSelectionStep from "./components/steps/HintSelectionStep";
import GuessStep from "./components/steps/GuessStep";
import useManageHints from "@/hooks/useManageHints";

export default function Game() {
  const { gameCategory, setGameCategory, gameTarget, fetchGameTarget, setGameTarget } = useGameData();
  const { currentStep, goToNextStep, goToPreviousStep, restartSteps } = useManageGameStep();
  const { hints, setHintUsed, resetHints, selectHint, selectedHint } = useManageHints();

  const gameHasStarted = currentStep > 0;

  const verifyGuess = (guess: string) => {
    if (guess === gameTarget) {
      goToNextStep();
    } else {
      goToPreviousStep();
    }
  };

  useEffect(() => {
    if (gameHasStarted) {
      if (!gameTarget) {
        fetchGameTarget(gameCategory);
      }
    }
  }, [gameHasStarted]);

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
              setGameTarget(null);
              restartSteps();
            }}
          />
        );
      case 2:
        return <GuessStep onSubmitGuess={verifyGuess} hintText={selectedHint?.hint!} />;
      case 3:
        return <h1>You won!</h1>;
      default:
        return null;
    }
  };

  return (
    <Stack width="100%">
      <h1>{gameTarget}</h1>
      {renderStep()}
    </Stack>
  );
}
