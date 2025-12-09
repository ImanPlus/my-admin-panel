import { Divider, Steps } from "antd";
import {
  CreditCardOutlined,
  ProfileOutlined,
  ScheduleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

export default function ContentWizards() {
  return (
    <div>
      <Steps
        type="navigation"
        size="default"
        className="site-navigation-steps"
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
  );
}
