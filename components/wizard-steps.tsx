import { Steps } from "antd";
import {
  CreditCardOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

export default function WizardSteps({
  current,
  next,
  prev,
}: {
  current: number;
  next: () => void;
  prev: () => void;
}) {
  return (
    <div className="w-full flex justify-center items-center border-b border-grayscale-100">
      <div className="flex justify-center items-center py-5 w-1/2">
        <Steps
          type="navigation"
          size="default"
          current={current}
          items={[
            {
              status: "process",
              icon: (
                <div className=" flex flex-col justify-center items-center">
                  <ShoppingCartOutlined className="text-4xl" />
                  <span className="text-16-regular">Card</span>
                </div>
              ),
            },
            {
              status: "wait",
              icon: (
                <div className=" flex flex-col justify-center items-center">
                  <ProfileOutlined className="text-4xl" />
                  <span className="text-16-regular ">Address</span>
                </div>
              ),
            },
            {
              status: "wait",
              icon: (
                <div className=" flex flex-col justify-center items-center">
                  <CreditCardOutlined className="text-4xl" />
                  <span className="text-16-regular ">Payment</span>
                </div>
              ),
            },
            {
              status: "wait",
              icon: (
                <div className=" flex flex-col justify-center items-center">
                  <ScheduleOutlined className="text-4xl" />
                  <span className="text-16-regular ">Confirmation</span>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
