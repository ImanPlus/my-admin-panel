import { InfoCircleOutlined } from "@ant-design/icons";
import { Alert } from "antd";

export default function StepOne() {
  return (
    <div className="grid grid-cols-12 gap-6 p-4">
      <div className="col-span-7 rounded-2xl p-4">
        <Alert
          message={
            <div>
              <h1 className="text-18-bold text-green-500">Available Offers</h1>
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
        <h1 className="text-20-semiBold py-2">My Shopping Bag (2 Items)</h1>
        <div className="border border-gray-300 rounded-2xl p-3">
          <p>say something...</p>
          <p>say something...</p>
        </div>
      </div>
      <div className="col-span-5 rounded-2xl p-4 bg-blue-500">
        <p>say something...</p>
        <p>say something...</p>
      </div>
    </div>
  );
}
