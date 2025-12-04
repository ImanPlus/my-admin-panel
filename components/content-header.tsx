"use client";

import { Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import {
  DollarOutlined,
  FileTextOutlined,
  FullscreenExitOutlined,
  HeartOutlined,
  MoonOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { App, Badge, Button, Dropdown, MenuProps, Tooltip } from "antd";
import { useThemeStore } from "@/store/theme-store";
import FormItemInput from "./ui/input/form-item-input";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ContentHeader() {
  const [scrolled, setScrolled] = useState(false);

  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const { notification } = App.useApp();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // SignOut
  const handlerSignOut = async () => {
    await signOut({ redirect: false });

    notification.success({
      message: "You have been signed out successfully.",
    });

    setTimeout(() => {
      router.push("/authentication/login");
    }, 2000);
  };

  const itemsUser: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <div className="flex gap-3">
          <UserOutlined className="bg-info-100! p-2.5! rounded-full! text-base cursor-pointer!" />
          <div>
            <p className="text-14-regular text-grayscale-500">Iman Jalali</p>
            <p className="text-12-regular text-grayscale-200">Admin</p>
          </div>
        </div>
      ),
    },
    {
      key: "1",
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <UserOutlined className="text-lg" />
            <p>My Profile</p>
          </div>
          <div className="flex gap-3">
            <SettingOutlined className="text-lg" />
            <p>Settings</p>
          </div>
          <div className="flex gap-3">
            <FileTextOutlined className="text-lg" />
            <p>Billing Plan</p>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      type: "divider",
    },
    {
      key: "4",
      label: (
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <DollarOutlined className="text-lg" />
            <p>Pricing</p>
          </div>
          <div className="flex gap-3">
            <QuestionCircleOutlined className="text-lg" />
            <p>FAQ</p>
          </div>
          <Button
            icon={<FullscreenExitOutlined />}
            iconPosition="start"
            className="bg-error-500! border-none!"
            onClick={handlerSignOut}
          >
            Logout
          </Button>
        </div>
      ),
    },
  ];

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
          <Dropdown
            menu={{
              items: itemsUser,
              className: "rounded-xl shadow-md min-w-50",
            }}
          >
            <Button type="text" className="hover:bg-transparent! w-10!">
              <UserOutlined className="bg-info-100! p-2.5! rounded-full! text-xl cursor-pointer!" />
            </Button>
          </Dropdown>

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
