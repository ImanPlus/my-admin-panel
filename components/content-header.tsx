"use client";

import { Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { HeartOutlined, HighlightOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";

export default function ContentHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Header
      className={`px-2! sticky! top-0 w-full! transition-all duration-300 rounded-xl ${
        scrolled
          ? "shadow-md px-7! bg-base-white!"
          : "shadow-none bg-grayscale-50!"
      }`}
    >
      <div className="flex justify-between items-center">
        <p>sdsadsad</p>
        <div className="flex gap-5 items-center flex-row-reverse">
          <UserOutlined className="bg-info-100! p-2.5! rounded-full! text-xl cursor-pointer!" />
          <Badge dot>
            <HeartOutlined className="text-xl cursor-pointer!" />
          </Badge>
          <HighlightOutlined className="text-xl cursor-pointer!" />
        </div>
      </div>
    </Header>
  );
}
