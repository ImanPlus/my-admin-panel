import { Content } from "antd/es/layout/layout";
import MetricCard from "./card/metric-card";

export default function ContentLayout({
  children,
    }: {
  children: React.ReactNode;
}) {
  return <Content className="h-[2000px]">{children}</Content>;
}
