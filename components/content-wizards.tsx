"use client";

import { useState } from "react";
import WizardSteps from "./wizard-steps";
import { Alert } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

export default function ContentWizards() {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((prev) => prev + 1);
  const prev = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="bg-base-white shadow-md rounded-2xl">
      <WizardSteps current={currentStep} next={next} prev={prev} />
      <div className="grid grid-cols-12 gap-6 p-4">
        <div className="col-span-7 rounded-2xl p-4">
          <Alert
            message={
              <div>
                <h1 className="text-18-bold text-green-500">
                  Available Offers
                </h1>
                <p className="text-green-500">
                  - 10% Instant Discount on Bank of America Corp Bank Debit and
                  Credit cards
                </p>
                <p className="text-green-500">
                  - 25% Cashback Voucher of up to $60 on first ever PayPal
                  transaction. TCA
                </p>
              </div>
            }
            icon={<InfoCircleOutlined />}
            type="success"
            closable
            showIcon
          />
          <p>say something...</p>
          <p>say something...</p>
        </div>
        <div className="col-span-5 rounded-2xl p-4 bg-blue-500">
          <p>say something...</p>
          <p>say something...</p>
        </div>
      </div>
    </div>
  );
}
