"use client";

import { useState } from "react";
import WizardSteps from "./ui/wizard-steps";
import {
  CreditCardOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import StepOne from "./steps/step-one";
import StepTwo from "./steps/step-two";
import StepThree from "./steps/step-three";
import StepFour from "./steps/step-four";

export default function ContentWizards() {
  const [currentStep, setCurrentStep] = useState(0);

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const stepData = [
    { label: "Card", icon: <ShoppingCartOutlined /> },
    { label: "Address", icon: <ProfileOutlined /> },
    { label: "Payment", icon: <CreditCardOutlined /> },
    { label: "Confirmation", icon: <ScheduleOutlined /> },
  ];

  return (
    <div className="bg-base-white shadow-md rounded-2xl">
      <WizardSteps
        current={currentStep}
        onChange={goToStep}
        stepData={stepData}
      />

      {currentStep === 0 && <StepOne />}
      {currentStep === 1 && <StepTwo />}
      {currentStep === 2 && <StepThree />}
      {currentStep === 3 && <StepFour />}
    </div>
  );
}
