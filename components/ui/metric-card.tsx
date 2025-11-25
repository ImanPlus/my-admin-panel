interface MetricCardProps {
  title: string;
  value: string | number;
  percentage: string;
  isPositive: boolean;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string; // Tailwind class e.g. "bg-green-200"
}

export default function MetricCard({
  title,
  value,
  percentage,
  isPositive,
  subtitle,
  icon,
  iconBg,
}: MetricCardProps) {
  return (
    <div className="p-5 flex justify-between bg-base-white rounded-2xl shadow-md w-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-16-regular">{title}</h1>

        <p className="text-16-semiBold flex items-center">
          {value}
          <span
            className={`pl-3! text-14-regular ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            ({percentage})
          </span>
        </p>

        <p className="text-12-regular! text-grayscale-500">{subtitle}</p>
      </div>
      <div className="flex items-start">
        <div className={`${iconBg} rounded-xl text-3xl p-2`}>{icon}</div>
      </div>
    </div>
  );
}
