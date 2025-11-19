import LogoIcon from "@/components/icons/logo-icon";
import Image from "next/image";
import '@ant-design/v5-patch-for-react-19';
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen">
      <div className="p-9 absolute top-0 text-primary-700 left-0 z-50 flex items-center text-18-bold gap-1">
        <LogoIcon />
        <span className="text-black text-20-medium">Materialize</span>
      </div>
      <div className="hidden lg:flex bg-gray-100 w-[62%] relative items-center justify-center">
        <div className="relative w-full flex items-center justify-center">
          <Image
            src="/pictures/auth-register.png"
            alt="auth-register"
            width={700}
            height={600}
            className="z-10"
          />
          <Image
            src="/pictures/cover-mask.png"
            alt="cover-mask"
            width={900}
            height={200}
            className="absolute bottom-0 translate-y-14 translate-x-0 w-full"
          />
        </div>
      </div>
      <div className="w-full lg:w-[38%] flex items-center justify-center px-12 py-6">{children}</div>
    </div>
  );
}
