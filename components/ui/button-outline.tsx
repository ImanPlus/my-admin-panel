import { Button, ButtonProps } from "antd";
import React from "react";

export default function ButtonOutline({
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <Button
      className={`bg-transparent! shadow-none! border! border-grayscale-200! text-[#0C0C0C]! ${
        className ?? ""
      }`}
      type="primary"
      {...rest}
    >
      {children}
    </Button>
  );
}
