"use client";

import FormItemInput from "@/components/ui/form-item-input";
import FormItemInputSelect from "@/components/ui/form-item-input-select";
import MetricCard from "@/components/ui/metric-card";
import {
  UsergroupAddOutlined,
  UserAddOutlined,
  UserOutlined,
  UserDeleteOutlined,
  DownOutlined,
  UploadOutlined,
  PrinterOutlined,
  CopyOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  EditOutlined,
  MoreOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Form,
  MenuProps,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import Link from "next/link";
import { useState } from "react";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];
interface DataType {
  key: React.Key;
  email: string;
  user: string;
  role: string;
  plan: string;
  status: string;
}

const itemsTable: MenuProps["items"] = [
  {
    key: "0",
    label: <Link href={{ pathname: "#" }}>Edit</Link>,
  },
  {
    key: "1",
    label: <Link href={{ pathname: "#" }}>Suspend</Link>,
  },
];

const columns: TableColumnsType<DataType> = [
  {
    title: "USER",
    dataIndex: "user",
    render: (value) => (
      <div className="flex items-center gap-2">
        <UserOutlined className="bg-gray-200 p-1.5 rounded-full" />
        <span>{value}</span>
      </div>
    ),
  },
  {
    title: "EMAIL",
    dataIndex: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
    defaultSortOrder: "descend",
    className: "text-grayscale-500",
  },
  {
    title: "ROLE",
    dataIndex: "role",
    sorter: (a, b) => a.role.localeCompare(b.role),
    defaultSortOrder: "descend",
    render: (value) => (
      <div className="flex items-center gap-2">
        <EditOutlined />
        <span>{value}</span>
      </div>
    ),
  },
  {
    title: "PLAN",
    dataIndex: "plan",
    sorter: (a, b) => a.plan.localeCompare(b.plan),
    defaultSortOrder: "descend",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    sorter: (a, b) => a.status.localeCompare(b.status),
    defaultSortOrder: "descend",
    render: (value) => (
      <div className="flex items-center gap-2">
        <Tag bordered={false} color="success">
          {value}
        </Tag>
      </div>
    ),
  },
  {
    title: "ACTIONS",
    dataIndex: "actions",
    render: () => (
      <div className="flex items-center gap-2">
        <Button type="text">
          <DeleteOutlined className="text-20-regular text-grayscale-400!" />
        </Button>

        <Button type="text">
          <EyeOutlined className="text-20-regular text-grayscale-400!" />
        </Button>

        <Dropdown
          menu={{
            items: itemsTable,
            className: "border border-grayscale-200 w-40!",
          }}
        >
          <Button type="text" className="p-3! rounded-full! ">
            <MoreOutlined className="text-base-black!" />
          </Button>
        </Dropdown>
      </div>
    ),
  },
];

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>(
  (_, i) => ({
    key: i,
    user: `Edward King ${i}`,
    email: `iman${i}@gmail.com`,
    role: `Subscriber${i}`,
    plan: `Basic ${i}`,
    status: "Active",
  })
);

export default function ListOfUsers() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: <Link href={{ pathname: "#" }}>Print</Link>,
      icon: <PrinterOutlined className="text-16-regular!" />,
    },
    {
      key: "1",
      label: <Link href={{ pathname: "#" }}>Csv</Link>,
      icon: <PrinterOutlined className="text-16-regular!" />,
    },
    {
      key: "2",
      label: <Link href={{ pathname: "#" }}>Excel</Link>,
      icon: <FileExcelOutlined className="text-16-regular!" />,
    },
    {
      key: "3",
      label: <Link href={{ pathname: "#" }}>Pdf</Link>,
      icon: <FilePdfOutlined className="text-16-regular!" />,
    },
    {
      key: "4",
      label: <Link href={{ pathname: "#" }}>Copy</Link>,
      icon: <CopyOutlined className="text-16-regular!" />,
    },
  ];
  const selectRoles = [
    {
      id: "1",
      role: "Admin",
    },
    {
      id: "2",
      role: "Author",
    },
    {
      id: "3",
      role: "Editor",
    },
    {
      id: "4",
      role: "Maintainer",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          title="Session"
          value="21,459"
          percentage="+29%"
          isPositive={true}
          subtitle="Total Users"
          icon={<UsergroupAddOutlined />}
          iconBg="bg-green-200"
        />

        <MetricCard
          title="Paid Users"
          value="4,567"
          percentage="+18%"
          isPositive={true}
          subtitle="Last week analytics"
          icon={<UserAddOutlined />}
          iconBg="bg-red-200"
        />

        <MetricCard
          title="Active Users"
          value="19,860"
          percentage="-14%"
          isPositive={false}
          subtitle="Last week analytics"
          icon={<UserOutlined />}
          iconBg="bg-green-200"
        />

        <MetricCard
          title="Pending Users"
          value="237"
          percentage="+42%"
          isPositive={true}
          subtitle="Last week analytics"
          icon={<UserDeleteOutlined />}
          iconBg="bg-yellow-200"
        />
      </div>

      <div className="bg-base-white rounded-2xl my-6 ">
        <div className="px-5 pt-6 pb-0 flex flex-col gap-3 border-b border-grayscale-200">
          <p className="text-16-semiBold">Filters</p>
          <Form>
            <div className="py-4 grid grid-cols-3 gap-4">
              <FormItemInputSelect
                name="role"
                labelCol={{ className: "text-14-regular! mb-0!" }}
                inputProps={{
                  allowClear: true,
                  className: "mb-0!",
                  placeholder: "Select Role",
                  options: selectRoles.map((e) => ({
                    label: e.role,
                    value: e.id,
                  })),
                }}
              />

              <FormItemInputSelect
                name="role"
                labelCol={{ className: "text-14-regular!" }}
                inputProps={{
                  className: "text-black!",
                  allowClear: true,
                  placeholder: "Select Plan",
                  options: selectRoles.map((e) => ({
                    label: e.role,
                    value: e.id,
                  })),
                }}
              />

              <FormItemInputSelect
                name="role"
                labelCol={{ className: "text-14-regular!" }}
                inputProps={{
                  className: "text-black!",
                  allowClear: true,
                  placeholder: "Select Status",
                  options: selectRoles.map((e) => ({
                    label: e.role,
                    value: e.id,
                  })),
                }}
              />
            </div>
          </Form>
        </div>

        <div className="p-5 flex justify-between items-center">
          <Dropdown menu={{ items, className: "border border-grayscale-200" }}>
            <Button
              icon={<UploadOutlined />}
              className="text-grayscale-500! bg-base-white! border border-[#6D788D]!"
            >
              <Space>
                Export
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>

          <div className="flex gap-3">
            <FormItemInput
              inputProps={{
                placeholder: "Search User",
              }}
            />
            <Button>Add New User</Button>
          </div>
        </div>

        <div>
          <Table<DataType>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            showSorterTooltip={{ target: "sorter-icon" }}
          />
        </div>
      </div>
    </div>
  );
}
