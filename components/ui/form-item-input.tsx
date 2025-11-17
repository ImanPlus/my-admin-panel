"use client";
import { Form, Input, type FormItemProps, type InputProps } from "antd";
import React from "react";

interface Props extends FormItemProps {
  inputProps?: InputProps;
}

export default function FormItemInput({ inputProps, ...rest }: Props) {
  return (
    <Form.Item labelCol={{className:"text-16-medium p-2"}} {...rest}>
      <Input className="p-2!" {...inputProps} />
    </Form.Item>
  );
}
