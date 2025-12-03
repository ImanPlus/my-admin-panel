import {
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";

interface Props {
  bgIcon: string;
  title: string;
  footer: string;
  date: string;
  isPositive: boolean;
  percent: string;
  icon: React.ReactNode;
}

export default function ContentSummeryCard({
  bgIcon,
  title,
  footer,
  date,
  isPositive,
  percent,
  icon,
}: Props) {
  return (
    <div className="flex justify-between text-16-regular h-full">
      <div className="flex flex-col justify-between gap-6">
        <div className={`rounded-xl text-3xl p-2 w-fit ${bgIcon}`}>{icon}</div>
        <p className="text-16-regular! text-grayscale-700!">{title}</p>
        <p className="text-16-regular! text-grayscale-400">{footer}</p>
        <p className="text-14-regular! bg-grayscale-100 text-grayscale-500 p-2 rounded-full">
          {date}
        </p>
      </div>
      <div
        className={`flex gap-0.5 ${
          isPositive ? "text-green-400" : "text-red-400"
        }`}
      >
        <h1>
          {isPositive ? "+" : "-"}
          {percent}
        </h1>
        <span>{isPositive ? <UpOutlined /> : <DownOutlined />}</span>
      </div>
    </div>
  );
}
