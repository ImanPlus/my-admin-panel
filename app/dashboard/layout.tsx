import ContentFooter from "@/components/content-footer";
import ContentHeader from "@/components/content-header";
import ContentLayout from "@/components/content-layout";
import SiderMenu from "@/components/sider-menu";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout className="min-h-screen!">
      <SiderMenu />
      <Layout className="w-full! px-10!">
        <ContentHeader />
        <ContentLayout>{children}</ContentLayout>
        <ContentFooter />
      </Layout>
    </Layout>
  );
}
