"use client";

import { Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import {
  HeartOutlined,
  MoonOutlined,
  SearchOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Tooltip } from "antd";
import { useThemeStore } from "@/store/theme-store";
import FormItemInput from "./ui/input/form-item-input";

export default function ContentHeader() {
  const [scrolled, setScrolled] = useState(false);

  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

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
        <FormItemInput
          className="m-0! text-5xl!"
          inputProps={{
            size: "large",
            variant: "borderless",
            placeholder: "Search",
            prefix: <SearchOutlined className="pr-2!" />,
          }}
        />
        <div className="flex gap-5 items-center flex-row-reverse">
          <UserOutlined className="bg-info-100! p-2.5! rounded-full! text-xl cursor-pointer!" />
          <Badge dot>
            <HeartOutlined className="text-xl cursor-pointer!" />
          </Badge>

          <Tooltip title={theme === "light" ? "Dark Mode" : "Light Mode"}>
            <div onClick={toggleTheme}>
              {theme === "light" ? (
                <MoonOutlined className="text-xl" />
              ) : (
                <SunOutlined className="text-xl" />
              )}
            </div>
          </Tooltip>
        </div>
      </div>
    </Header>
  );
}
