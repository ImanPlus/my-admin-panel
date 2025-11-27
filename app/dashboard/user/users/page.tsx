"use client";

import FormItemInput from "@/components/ui/form-item-input";
import FormItemInputSelect from "@/components/ui/form-item-input-select";

import { handleGetAllUser } from "@/helper/api";
import { promisePipe } from "@/helper/exception-handler";
import {
 
  UserOutlined,
  
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
  App,
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
import { useEffect, useState } from "react";
import ContentCardUser from "@/components/content-card-user";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];
interface DataType {
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
  id: number;
}
[];

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




export default function ListOfUsers() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [sending, setSending] = useState(false);
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
  const { notification } = App.useApp();
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  function randomNumber() {
    return Math.floor(Math.random() * 5) + 1
  }

  const columns: TableColumnsType<DataType> = [
  {
    key:"dsf",
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
    key:"dsfdf",
    title: "EMAIL",
    dataIndex: "email",
    sorter: (a, b) => a.email.localeCompare(b.email),
    defaultSortOrder: "descend",
    className: "text-grayscale-500",
  },
  {
    key:"dsfdasad",
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
    key:"dsfsde",
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
    key:"dsrtretf",
    title: "STATUS",
    dataIndex: "status",
    filters: [
      {text: "Active" , value: "Active"},
      {text: "Inactive" , value: "Inactive"},
      {text: "Pending" , value: "Pending"},
    ],
    // onFilter: (value,record) => record.status === value,
    render: () => {

      return(
      <div className="flex items-center gap-2">
        <Tag bordered={false} color={randomNumber() === 1 ? "success" :randomNumber() === 2 ? "blue" : "warning"}>
          {randomNumber() === 1 ? "Active" : randomNumber() === 2 ? "Inactive" : "Pending"}
        </Tag>
      </div>
      )
    },
  },
  {
    key:"dsfdfrrrrt",
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

  return (
    <div>
      {/* Cards of users */}
      <ContentCardUser />

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
                name="plan"
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
                name="status"
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
            dataSource={dataUser}
            showSorterTooltip={{ target: "sorter-icon" }}
          />
        </div>
      </div>
    </div>
  );
}
