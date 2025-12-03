"use client";

import { App, Button, Checkbox, Form } from "antd";
import FormItemInput from "../ui/input/form-item-input";
import FormItemInputPassword from "../ui/input/form-item-input-password";
import Link from "next/link";
import { useState } from "react";
import { promisePipe } from "@/helper/exception-handler";
import { handleLoginUser } from "@/helper/api";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [sending, setSending] = useState(false);
  const { notification } = App.useApp();

  const handleSubmit = async (value: {
    username: string;
    password: string;
  }) => {
    if (sending) return;
    setSending(true);

    promisePipe(
      handleLoginUser(value.username, value.password).then(async (res) => {
        if (res) {
          await signIn("credentials", {
            redirect: true,
            redirectTo: "/dashboard",
            access_token: res?.data?.token,
          });
        } else {
          notification.error({
            message: "Login failed. No response received.",
          });
        }
      })
    )
      .catch((res:Error) => {
        notification.error({ message: res.message });
      })
      .finally(() => setSending(false));
  };

  return (
    <div>
      <Form onFinish={handleSubmit} className="flex flex-col gap-3">
        <FormItemInput name="username" inputProps={{ placeholder: "Email" }} />
        <FormItemInputPassword
          name="password"
          inputProps={{ placeholder: "Password" }}
        />
        <div className="flex justify-between">
          <Checkbox>Remember Me</Checkbox>
          <Link href="/" className="text-primary-500! hover:text-primary-700!">
            Forgot Password?
          </Link>
        </div>
        <Button loading={sending} htmlType="submit" className="w-full my-4">
          Sign in
        </Button>
      </Form>
    </div>
  );
}
