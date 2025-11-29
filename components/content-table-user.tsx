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
import ContentExportSearchUser from "./content-export-search-user";
import ContentFilterUser from "./content-filter-user";

interface DataType {
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
  id: number;
  role: number;
  plan: number;
  status: number;
}

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

export default function ContentTableUser() {
  // State
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sending, setSending] = useState(false);
  const { notification } = App.useApp();
  const [dataUser, setDataUser] = useState<DataType[]>([]);
  const [filter, setFilter] = useState({
    role: "",
    plan: "",
    status: "",
  });
  const [searchValue, setSearchValue] = useState("");

  // Fetch API
  const getUsers = async () => {
    if (sending) return;
    setSending(true);

    promisePipe(
      handleGetAllUser()
        .then(async (res: DataType[]) => {
          if (res.length) {
            setDataUser(
              res.map((e, i) => ({
                email: e.email,
                id: e.id,
                name: e.name,
                role: randomNumber(),
                plan: randomNumber(),
                status: randomNumber(),
              }))
            );
          }
        })
        .catch((res: Error) => {
          notification.error({ message: res.message });
        })
    ).finally(() => setSending(false));
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
        { text: "Maintainer", value: 1 },
        { text: "Subscriber", value: 2 },
        { text: "Editor", value: 3 },
        { text: "Author", value: 4 },
        { text: "Admin", value: 5 },
      ],
      onFilter: (value, record) => record.role === value,
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">
            <EditOutlined />
            <span>
              {record.role === 1
                ? "Maintainer"
                : record.role === 2
                ? "Subscriber"
                : record.role === 3
                ? "Editor"
                : record.role === 4
                ? "Author"
                : "Admin"}
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
        { text: "Enterprise", value: 1 },
        { text: "Basic", value: 2 },
        { text: "Team", value: 3 },
        { text: "Compony", value: 4 },
      ],
      onFilter: (value, record) => record.plan === value,
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">
            <span>
              {record.plan === 1
                ? "Enterprise"
                : record.plan === 2
                ? "Basic"
                : record.plan === 3
                ? "Team"
                : "Compony"}
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
        { text: "Active", value: 1 },
        { text: "Inactive", value: 2 },
        { text: "Pending", value: 3 },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, record) => {
        return (
          <div className="flex items-center gap-2">
            <Tag
              bordered={false}
              color={
                record.status === 1
                  ? "success"
                  : record.status === 2
                  ? "default"
                  : "warning"
              }
              className="rounded-full!"
            >
              <span>
                {record.status === 1
                  ? "Active"
                  : record.status === 2
                  ? "Inactive"
                  : "Pending"}
              </span>
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

  const getFilteredData = () => {
    return dataUser.filter((item) => {
      // Filter of dropdown
      const roleMatch = filter.role ? item.role === +filter.role : true;
      const planMatch = filter.plan ? item.plan === +filter.plan : true;
      const statusMatch = filter.status ? item.status === +filter.status : true;

      // Search Value
      const searchMatch = searchValue
        ? Object.values(item).some(
            (value) =>
              value !== null &&
              value !== undefined &&
              String(value).toLowerCase().includes(searchValue.toLowerCase())
          )
        : true;

      return roleMatch && planMatch && statusMatch && searchMatch;
    });
  };

  return (
    <div>
      {/* Filters */}
      <ContentFilterUser filter={filter} setFilter={setFilter} />

      {/* Export & Search User */}
      <ContentExportSearchUser
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={getFilteredData()}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
}
