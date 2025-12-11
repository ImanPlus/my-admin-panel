"use client";

import { Header } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import {
  CloseOutlined,
  DollarOutlined,
  FileTextOutlined,
  FullscreenExitOutlined,
  HeartOutlined,
  HomeOutlined,
  MenuOutlined,
  MoonOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  App,
  Badge,
  Button,
  Divider,
  Drawer,
  DrawerProps,
  Dropdown,
  Menu,
  MenuProps,
  Tooltip,
} from "antd";
import { useThemeStore } from "@/store/theme-store";
import FormItemInput from "./ui/input/form-item-input";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import LogoIcon from "./icons/logo-icon";
import Link from "next/link";
import Cookies from "js-cookie";

export default function ContentHeader() {
  const [scrolled, setScrolled] = useState(false);

  const theme = useThemeStore((state) => state.theme);
  const [themeClient, setThemeClient] = useState(Cookies.get("theme"));
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const { notification } = App.useApp();
  const router = useRouter();
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const onClose = () => {
    setOpen(!open);
  };

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
        <div className="flex gap-3">
          <UserOutlined className="text-lg" />
          <p>My Profile</p>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="flex gap-3">
          <SettingOutlined className="text-lg" />
          <p>Settings</p>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div className="flex gap-3">
          <FileTextOutlined className="text-lg" />
          <p>Billing Plan</p>
        </div>
      ),
    },
    {
      key: "5",
      type: "divider",
    },
    {
      key: "6",
      label: (
        <div className="flex gap-3">
          <DollarOutlined className="text-lg" />
          <p>Pricing</p>
        </div>
      ),
    },
    {
      key: "7",
      label: (
        <div className="flex gap-3">
          <QuestionCircleOutlined className="text-lg" />
          <p>FAQ</p>
        </div>
      ),
    },
    {
      key: "8",
      className: "bg-transparent!",
      label: (
        <Button
          icon={<FullscreenExitOutlined />}
          iconPosition="start"
          className="bg-error-500! border-none! w-full!"
          onClick={handlerSignOut}
        >
          Logout
        </Button>
      ),
    },
  ];

  const items: MenuProps["items"] = [
    {
      key: "dashboard",
      label: <Link href="/dashboard">Dashboard</Link>,
      icon: <HomeOutlined />,
    },

    ...(!collapsed
      ? [
          {
            key: "custom-divider",
            type: "group" as const,
            label: (
              <Divider
                orientation="left"
                className="my-0! text-10-regular! text-grayscale-200!"
              >
                Apps & Pages
              </Divider>
            ),
          },
        ]
      : []),
    {
      key: "eCommerce",
      label: "eCommerce",
      icon: <DollarOutlined />,
      title: "eCommerce",
      children: [
        {
          key: "Products",
          label: (
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              Products
            </span>
          ),
          title: "Products",
          children: [
            {
              key: "productList",
              label: (
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  Product List
                </span>
              ),
            },
            {
              key: "addList",
              label: (
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  Add Product
                </span>
              ),
            },
          ],
        },
      ],
    },
    {
      key: "users",
      label: "Users",
      icon: <UserOutlined />,
      children: [
        {
          key: "listUsers",
          label: (
            <Link href="/dashboard/user/users">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                List
              </span>
            </Link>
          ),
        },
      ],
    },
  ];

  return (
    <Header
      className={`px-0! md:px-2! sticky! z-100 top-0 w-full!  transition-all duration-300 rounded-xl ${
        scrolled
          ? "shadow-md px-7! bg-base-white!"
          : "shadow-none bg-grayscale-50!"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Hamburger button */}
        <Button
          type="text"
          className="text-base-black! md:hidden! p-0! h-auto! min-w-0! w-auto! flex items-center justify-center cursor-pointer"
          size="small"
          onClick={onClose}
        >
          <MenuOutlined />
        </Button>

        {/* Search Bar  */}
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

          <Tooltip title={themeClient === "light" ? "Dark Mode" : "Light Mode"}>
            {themeClient === "light" ? (
              <button onClick={toggleTheme} className="cursor-pointer">
                <MoonOutlined className="text-xl" />
              </button>
            ) : (
              <button onClick={toggleTheme} className="cursor-pointer">
                <SunOutlined className="text-xl" />
              </button>
            )}
          </Tooltip>
        </div>
      </div>

      <Drawer
        open={open}
        placement={placement}
        onClose={onClose}
        className="lg:hidden!"
        closable={false}
        width={300}
      >
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-start gap-1 text-primary-700">
              <LogoIcon />
              <span className="text-grayscale-400! text-20-medium">
                Materialize
              </span>
            </div>
            <CloseOutlined onClick={onClose} />
          </div>
          <Menu
            mode="inline"
            inlineCollapsed={collapsed}
            defaultSelectedKeys={["dashboard"]}
            items={items}
            onClick={() => {
              onClose();
            }}
          />
        </div>
      </Drawer>
    </Header>
  );
}
