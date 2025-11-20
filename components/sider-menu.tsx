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
import Link from "next/link";

export default function SiderMenu() {
  const [open, setOpen] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "dashboard",
      label: <span className="flex gap-2">Dashboard</span>,
      icon: <HomeOutlined />,
    },
    {
      key: "custom-divider",
      type: "group",
      label: (
        <Divider
          orientation="left"
          className="my-0! text-10-regular! text-grayscale-200!"
        >
          {!open && "Apps & Pages"}
        </Divider>
      ),
    },
    {
      key: "eCommerce",
      label: <span className="flex gap-2">eCommerce</span>,
      icon: <DollarOutlined />,
      children: [
        {
          key: "Products",
          label: <span className="flex gap-2">Products</span>,
          icon: (
            <div className="w-2 h-2 rounded-full min-w-0! bg-gray-400 mr-2"></div>
          ),
          children: [
            {
              key: "productList",
              style: { paddingLeft: "50px" },
              label: <span className="flex gap-2">Product List</span>,
              icon: (
                <div className="w-2 h-2 rounded-full min-w-0! bg-gray-400 mr-2"></div>
              ),
            },
            {
              key: "addList",
              style: { paddingLeft: "50px" },
              label: <span className="flex gap-2 p-2">Add Product</span>,
              icon: (
                <div className="w-2 h-2 rounded-full min-w-0! bg-gray-400"></div>
              ),
            },
          ],
        },
      ],
    },
  ];

  // const items: MenuProps["items"] = [
  //   {
  //     key: "ul-1",
  //     label: "Dashboards",
  //     icon: <HomeOutlined />,
  //   },
  //   {
  //     key: "custom-divider",
  //     type: "group",
  //     label: (
  //       <Divider
  //         orientation="left"
  //         className="m-0! py-1! text-10-regular text-grayscale-300!"
  //       >
  //         Apps & Pages
  //       </Divider>
  //     ),
  //   },
  //   {
  //     key: "ul-2",
  //     label: "eCommerce",
  //     icon: <DollarOutlined />,
  //     children: [
  //       {
  //         key: "li-1",
  //         label: (
  //           <div className="flex items-center justify-! gap-2">
  //             <div className="w-2 h-2 rounded-full bg-gray-400"></div>
  //             Products
  //           </div>
  //         ),
  //         children: [
  //           {
  //             key: "li-2",
  //             label: (
  //               <Link
  //                 href={"/"}
  //                 className="flex items-center justify-! gap-2"
  //               >
  //                 <div className="w-2 h-2 rounded-full bg-gray-400"></div>
  //                 Product List
  //               </Link>
  //             ),
  //           },
  //           {
  //             key: "li-3",
  //             label: (
  //               <Link
  //                 href={"/"}
  //                 className="flex items-center justify-start! gap-2"
  //               >
  //                 <div className="w-2 h-2 rounded-full bg-gray-400"></div>
  //                 Add Product
  //               </Link>
  //             ),
  //           },
  //           {
  //             key: "li-4",
  //             label: (
  //               <Link
  //                 href={"/"}
  //                 className="flex items-center justify-start! gap-2"
  //               >
  //                 <div className="w-2 h-2 rounded-full bg-gray-400"></div>
  //                 Category List
  //               </Link>
  //             ),
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     key: "ul-3",
  //     label: "Users",
  //     icon: <UserOutlined />,
  //     children: [
  //       {
  //         key: "li-5",
  //         label: (
  //           <Link href={"/"} className="">
  //             {/* <div className="w-2 h-2 rounded-full bg-gray-400"></div> */}
  //             List
  //           </Link>
  //         ),
  //       },
  //       {
  //         key: "li-6",
  //         label: (
  //           <Link href={"/"} className="">
  //             {/* <div className="w-2 h-2 rounded-full bg-gray-400"></div> */}
  //             View
  //           </Link>
  //         ),
  //         // children: [
  //         //   {
  //         //     key: "li-7",
  //         //     label: (
  //         //       <Link
  //         //         href={"/"}
  //         //         className="flex items-center justify-start! gap-2"
  //         //       >
  //         //         <div className="w-2 h-2 rounded-full bg-gray-400"></div>
  //         //         Account
  //         //       </Link>
  //         //     ),
  //         //   },
  //         // ],
  //       },
  //     ],
  //   },
  // ];

  return (
    <Sider collapsed={open} width="12rem" className="bg-gray-100! relative!">
      <Button
        onClick={() => setOpen(!open)}
        type="text"
        className="absolute! -right-5! top-5! w-1! h-1! rounded-full! bg-grayscale-100!"
        icon={
          open ? (
            <DoubleRightOutlined className="text-primary-950!" />
          ) : (
            <DoubleLeftOutlined className="text-primary-950!" />
          )
        }
      />
      <div className="p-2 text-primary-700 flex items-center justify-center text-18-bold gap-1">
        <LogoIcon />
        <span className={`text-black text-20-medium ${open ? "hidden" : ""}`}>
          Materialize
        </span>
      </div>

      <Menu
        className="px-0!"
        rootClassName="px-0!"
        mode="inline"
        defaultSelectedKeys={["2"]}
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Sider>
  );
}
