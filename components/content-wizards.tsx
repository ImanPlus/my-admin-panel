"use client"

import { useState } from "react";
import WizardSteps from "./wizard-steps";

export default function ContentWizards() {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((prev) => prev + 1);
  const prev = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="bg-base-white shadow-md rounded-2xl">
      <WizardSteps current={currentStep} next={next} prev={prev} />
      <div >
        <p>say something...</p>
        <p>say something...</p>
        <p>say something...</p>
        <p>say something...</p>
      </div>
    </div>
  );
}
