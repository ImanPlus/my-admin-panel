import { Content } from "antd/es/layout/layout";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Content>{children}</Content>;
}
