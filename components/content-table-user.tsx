"use client";
import {
  Table,
  TableProps,
  Button,
  Dropdown,
  MenuProps,
  TableColumnsType,
  Tag,
  App,
} from "antd";
import { useEffect, useState } from "react";
import {
  UserOutlined,
  EditOutlined,
  MoreOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { randomNumber } from "@/helper/method";
import { promisePipe } from "@/helper/exception-handler";
import { handleGetAllUser } from "@/helper/api";

interface DataType {
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
  id: number;
}

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

export default function ContentTableUser() {
  // State
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sending, setSending] = useState(false);
  const { notification } = App.useApp();
  const [dataUser, setDataUser] = useState<
    {
      email: string;
      name: {
        firstname: string;
        lastname: string;
      };
      id: number;
    }[]
  >();

  // Fetch API
  const getUsers = async () => {
    if (sending) return;
    setSending(true);

    promisePipe(
      handleGetAllUser().then(async (res) => {
        if (res.length) {
          setDataUser(res);
        } else {
          notification.error({
            message: res.message,
          });
        }
      })
    )
      .catch((res: Error) => {
        notification.error({ message: res.message });
      })
      .finally(() => setSending(false));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUsers();
  }, []);

  // Select Row
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // Data of Table
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
      key: "user",
      title: "USER",
      dataIndex: "user",
      render: (value, record) => (
        <div className="flex items-center gap-2">
          <UserOutlined className="bg-gray-200 p-1.5 rounded-full" />
          <span>{`${record.name.firstname} ${record.name.lastname}`}</span>
        </div>
      ),
    },
    {
      key: "email",
      title: "EMAIL",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      defaultSortOrder: "descend",
      className: "text-grayscale-500",
    },
    {
      key: "role",
      title: "ROLE",
      dataIndex: "role",
      filters: [
        { text: "Maintainer", value: "Maintainer" },
        { text: "Subscriber", value: "Subscriber" },
        { text: "Editor", value: "Editor" },
        { text: "Author", value: "Author" },
      ],
      // onFilter: (value, record) => record.role === value,
      render: () => {
        const random = Math.floor(Math.random() * 5) + 1;
        return (
          <div className="flex items-center gap-2">
            <EditOutlined />
            <span>
              {random === 1
                ? "Maintainer"
                : random === 2
                ? "Subscriber"
                : random === 3
                ? "Editor"
                : "Author"}
            </span>
          </div>
        );
      },
    },
    {
      key: "plan",
      title: "PLAN",
      dataIndex: "plan",
      filters: [
        { text: "Enterprise", value: "Enterprise" },
        { text: "Basic", value: "Basic" },
        { text: "Team", value: "Team" },
      ],
      // onFilter: (value, record) => record.plan === value,
      render: () => {
        const random = Math.floor(Math.random() * 5) + 1;
        return (
          <div className="flex items-center gap-2">
            <span>
              {random === 1 ? "Enterprise" : random === 2 ? "Basic" : "Team"}
            </span>
          </div>
        );
      },
    },
    {
      key: "status",
      title: "STATUS",
      dataIndex: "status",
      filters: [
        { text: "Active", value: "Active" },
        { text: "Inactive", value: "Inactive" },
        { text: "Pending", value: "Pending" },
      ],
      // onFilter: (value,record) => record.status === value,
      render: () => {
        return (
          <div className="flex items-center gap-2">
            <Tag
              bordered={false}
              color={
                randomNumber() === 1
                  ? "success"
                  : randomNumber() === 2
                  ? "blue"
                  : "warning"
              }
            >
              {randomNumber() === 1
                ? "Active"
                : randomNumber() === 2
                ? "Inactive"
                : "Pending"}
            </Tag>
          </div>
        );
      },
    },
    {
      key: "actions",
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

  return (
    <div>
      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataUser}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
}
