import ContentHeader from "@/components/content-header";
import SiderMenu from "@/components/sider-menu";
import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";

export default async function layout() {
  return (
    <Layout className="min-h-screen!">
      <SiderMenu />
      <Layout className="w-full! px-10!">
        <ContentHeader />
        <Content className="h-[2000px] pt-14">Content mee</Content>
        <Footer className="bg-amber-600!">Footer mee</Footer>
      </Layout>
    </Layout>
  );
}
