import { isNaN } from "lodash";
import { useState } from "react";

interface IUseManageGameStep {
  currentStep: number;
  goToNextStep: () => void;
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

  const goToNextStep = () => {
    const nextStep = currentStep + 1;
    localStorage.setItem("currentStep", nextStep.toString());
    setCurrentStep(nextStep);
  };

  const restartSteps = () => {
    localStorage.setItem("currentStep", "0");
    setCurrentStep(0);
  };

  return { currentStep, goToNextStep, restartSteps };
};

export default useManageGameStep;
