import { Divider } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import LoginForm from "@/components/login/content-form-login";

export default function Login() {
  return (
    <div className="w-px-400 mx-auto pt-12 pt-lg-0 flex flex-col">
      <h1 className="mb-1 text-18-medium md:text-20-medium">
        Welcome to Materialize! 👋
      </h1>
      <p className="mb-5 text-grayscale-500">
        Please sign-in to your account and start the adventure
      </p>
      <LoginForm />
      <Divider className="text-grayscale-500!">or</Divider>

      {/* Social Media */}
      <div className="flex justify-center gap-2.5">
        <div className="hover:bg-error-400/20 rounded-full w-8 h-8 flex items-center justify-center">
          <GoogleOutlined className="text-error-600!" />
        </div>
      </div>
    </div>
  );
}
