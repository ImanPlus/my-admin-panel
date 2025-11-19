import SiderMenu from "@/components/sider-menu";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

export default function layout() {
  return (
    <Layout className="min-h-screen!">
      <SiderMenu />
      <Layout>
        <Header className="bg-pink-300!">Header mee</Header>
        <Content>Content mee</Content>
        <Footer className="bg-amber-600!">Footer mee</Footer>
      </Layout>
    </Layout>
  );
}
