"use client";
import { Form, Select, type SelectProps, type FormItemProps } from "antd";
import React from "react";

interface Props extends FormItemProps {
  inputProps?: SelectProps;
}

export default function FormItemInputSelect({ inputProps, ...rest }: Props) {
  return (
    <Form.Item labelCol={{className:"text-16-medium"}} {...rest}>
      <Select {...inputProps} />
    </Form.Item>
  );
}
