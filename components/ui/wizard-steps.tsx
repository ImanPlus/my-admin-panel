import { Steps } from "antd";

type StepStatus = "process" | "finish" | "wait" | "error";

export default function WizardSteps({
  current,
  onChange,
  stepData,
}: {
  current: number;
  onChange: (stepIndex: number) => void;
  stepData: { label: string; icon: React.ReactNode }[];
}) {
  const items = stepData.map((step, index) => {
    const isActive = index === current;
    const isCompleted = index < current;
    const status: StepStatus = isActive
      ? "process"
      : isCompleted
      ? "finish"
      : "wait";

    return {
      status,
      icon: (
        <div className=" flex flex-col justify-center items-center">
          {step.icon}
          <span className="text-16-regular">{step.label}</span>
        </div>
      ),
    };
  });

  return (
    <div className="w-full flex justify-center items-center border-b border-grayscale-100">
      <div className="flex justify-center items-center py-5 w-1/2">
        <Steps
          type="navigation"
          size="default"
          current={current}
          onChange={onChange}
          items={items}
        />
      </div>
    </div>
  );
}
