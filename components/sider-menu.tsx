"use client";

import { Button, Divider, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import {
  DollarOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import LogoIcon from "./icons/logo-icon";

export default function SiderMenu() {
  const [collapsed, setCollapsed] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <HomeOutlined />,
    },
    
    ...(!collapsed ? [{
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
    }] : []),
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
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              List
            </span>
          ),
        },
      ],
    },
  ];

  return (
    <Sider
      collapsed={collapsed}
      width="12rem"
      className="bg-gray-100! relative!"
    >
      <Button
        onClick={() => setCollapsed(!collapsed)}
        type="text"
        className="absolute! -right-5! top-5! w-1! h-1! rounded-full! bg-grayscale-100!"
        icon={
          collapsed ? (
            <DoubleRightOutlined className="text-primary-950!" />
          ) : (
            <DoubleLeftOutlined className="text-primary-950!" />
          )
        }
      />
      <div className="p-2 text-primary-700 flex items-center justify-center text-18-bold gap-1">
        <LogoIcon />
        <span
          className={`text-black text-20-medium ${collapsed ? "hidden" : ""}`}
        >
          Materialize
        </span>
      </div>

      <Menu
        mode="inline"
        inlineCollapsed={collapsed}
        defaultSelectedKeys={["dashboard"]}
        items={items}
      />
    </Sider>
  );
}