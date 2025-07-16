"use client";
import React, { useEffect } from "react";
import useGameData, { GameCategory } from "@/hooks/useGameData";
import { Stack } from "@mui/material";
import useManageGameStep from "@/hooks/useManageGameStep";
import CategorySelectionStep from "./components/steps/CategorySelectionStep";
import HintSelectionStep from "./components/steps/HintSelectionStep";
import GuessStep from "./components/steps/GuessStep";
import useManageHints from "@/hooks/useManageHints";
import WinnerStep from "./components/steps/WinnerStep";
import GameOverStep from "./components/steps/GameOverStep";

const GAME_STEPS = {
  CATEGORY_SELECTION: 0,
  HINT_SELECTION: 1,
  GUESS: 2,
  WINNER: 3,
  GAME_OVER: 4,
};

export default function Game() {
  const { gameCategory, setGameCategory, gameTarget, fetchGameTarget, setGameTarget } = useGameData();
  const { currentStep, goToNextStep, goToPreviousStep, restartSteps } = useManageGameStep();
  const { hints, setHintUsed, resetHints, selectHint, selectedHint } = useManageHints();

  const gameHasStarted = currentStep > GAME_STEPS.CATEGORY_SELECTION;

  const verifyGuess = (guess: string) => {
    if (guess === gameTarget) {
      goToNextStep();
    } else {
      goToPreviousStep();
    }
  };

  const restartGame = async () => {
    await resetHints();
    setGameTarget(null);
    restartSteps();
  }

  const handleCategorySelection = (category: GameCategory) => {
    setGameCategory(category);
    goToNextStep();
  }

  const handleHintSelection = async (id: number) => {
    await setHintUsed(id);
    selectHint(id);
    goToNextStep();
  }

  useEffect(() => {
    if (gameHasStarted && gameCategory) {
      if (!gameTarget) {
        fetchGameTarget(gameCategory);
      }
    }
  }, [gameHasStarted]);

  const renderStep = () => {
    switch (currentStep) {
      case GAME_STEPS.CATEGORY_SELECTION:
        return (
          <CategorySelectionStep onSetCategory={handleCategorySelection} />
        );
      case GAME_STEPS.HINT_SELECTION:
        return (
          <HintSelectionStep
            hints={hints}
            onSelectHint={handleHintSelection}
            onOutOfHints={() => goToNextStep(GAME_STEPS.GAME_OVER)}
            gameCategory={gameCategory!}
            onRestart={restartGame}
          />
        );
      case GAME_STEPS.GUESS:
        return <GuessStep onSubmitGuess={verifyGuess} hintText={selectedHint?.hint!} />;
      case GAME_STEPS.WINNER:
        return <WinnerStep onRestart={restartGame} />;
      case GAME_STEPS.GAME_OVER:
        return <GameOverStep onRestart={restartGame} target={gameTarget!} />;
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
