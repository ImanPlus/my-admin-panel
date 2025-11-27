import MetricCard from "@/components/card/metric-card";
import {
  UsergroupAddOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";

export default function ContentCardUser() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <MetricCard
        title="Session"
        value="21,459"
        percentage="+29%"
        isPositive={true}
        subtitle="Total Users"
        icon={<UsergroupAddOutlined />}
        iconBg="bg-green-200"
      />

      <MetricCard
        title="Paid Users"
        value="4,567"
        percentage="+18%"
        isPositive={true}
        subtitle="Last week analytics"
        icon={<UserAddOutlined />}
        iconBg="bg-red-200"
      />

      <MetricCard
        title="Active Users"
        value="19,860"
        percentage="-14%"
        isPositive={false}
        subtitle="Last week analytics"
        icon={<UserOutlined />}
        iconBg="bg-green-200"
      />

      <MetricCard
        title="Pending Users"
        value="237"
        percentage="+42%"
        isPositive={true}
        subtitle="Last week analytics"
        icon={<UserDeleteOutlined />}
        iconBg="bg-yellow-200"
      />
    </div>
  );
}
