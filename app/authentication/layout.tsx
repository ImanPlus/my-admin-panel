import LogoIcon from "@/components/icons/logo-icon";
import Image from "next/image";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex">
      <div className="p-7">
        <LogoIcon />
      </div>
      <div className="flex">
        <div className="relative h-screen">
          <Image
            src="/pictures/auth-register.png"
            alt="auth-register"
            width={700}
            height={600}
          />
          <Image
            src="/pictures/cover-mask.png"
            alt="cover-mask"
            width={900}
            height={200}
            className="absolute bottom-0 transform translate-y-44 -translate-x-28"
          />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
