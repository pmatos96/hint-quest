import { isNaN } from "lodash";
import { useState } from "react";

interface IUseManageGameStep {
  currentStep: number;
  goToNextStep: (step?: number) => void;
  goToPreviousStep: () => void;
  restartSteps: () => void;
}

const useManageGameStep = (): IUseManageGameStep => {
  const getSanitizedStoredStep = (): number => {
    const currentStep = Number(localStorage.getItem("currentStep"));
    if (isNaN(currentStep)) {
      return 0;
    }
    return currentStep;
  };

  const [currentStep, setCurrentStep] = useState<number>(() => {
    return getSanitizedStoredStep() || 0;
  });

  const goToNextStep = (step?: number) => {
    const nextStep = step || currentStep + 1;
    localStorage.setItem("currentStep", nextStep.toString());
    setCurrentStep(nextStep);
  };

  const goToPreviousStep = () => {
    const previousStep = currentStep - 1;
    if (previousStep >= 0) {
      localStorage.setItem("currentStep", previousStep.toString());
      setCurrentStep(previousStep);
    }
  };

  const restartSteps = () => {
    localStorage.setItem("currentStep", "0");
    setCurrentStep(0);
  };

  return { currentStep, goToNextStep, goToPreviousStep, restartSteps };
};

export default useManageGameStep;
