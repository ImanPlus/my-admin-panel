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
  Modal,
  Form,
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
import {
  handleDeleteUser,
  handleGetAllUser,
  handlePutUpdateUser,
} from "@/helper/api";
import ContentExportSearchUser from "./content-export-search-user";
import ContentFilterUser from "./content-filter-user";
import CustomPagination from "./custom-pagination";
import FormItemInput from "./ui/input/form-item-input";
import FormItemInputPassword from "./ui/input/form-item-input-password";
import ButtonOutline from "./ui/button/button-outline";

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
  password: string;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [form] = Form.useForm();
  // const [copyData, setCopyData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  // });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

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
                password: "1111",
              }))
            );
          }
        })
        .catch((res: Error) => {
          notification.error({ message: res.message });
        })
    ).finally(() => setSending(false));
  };

  const putUser = async () => {
    if (!selectedUserId) {
      notification.error({ message: "User ID not defined!" });
      return;
    }

    if (sending) return;
    setSending(true);

    const values = await form.validateFields();

    promisePipe(
      handlePutUpdateUser(1, values.user, values.email, values.password)
        .then(() => {
          notification.success({ message: "User updated successfully." });
          handleCancel();
          getUsers();
        })
        .catch((error: Error) => {
          notification.error({ message: error.message });
        })
        .finally(() => setSending(false))
    );
  };

  const deleteUser = async (value: number) => {
    if (!value) {
      notification.error({ message: "User ID not defined!" });
      return;
    }

    if (sending) return;
    setSending(true);

    promisePipe(
      handleDeleteUser(value)
        .then((res) => {
          console.log("res", res);
          notification.success({ message: "User deleted successfully!" });
        })
        .catch((error: Error) => {
          notification.error({ message: error.message });
        })
        .finally(() => setSending(false))
    );
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
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button
            type="text"
            onClick={() => {
              deleteUser(record.id);
            }}
          >
            <DeleteOutlined className="text-20-regular text-grayscale-400!" />
          </Button>

          <Button type="text">
            <EyeOutlined className="text-20-regular text-grayscale-400!" />
          </Button>

          <Dropdown
            menu={{
              items: [
                {
                  key: "0",
                  label: (
                    <Button type="link" className="p-0! text-base-black!">
                      Edit
                    </Button>
                  ),
                  onClick: () => {
                    showModal();
                    // const data = dataUser.find((e) => e.id === record.id);
                    setSelectedUserId(record.id);

                    // setCopyData({
                    //   username: data?.name.firstname ?? "",
                    //   email: data?.email ?? "",
                    //   password: data?.password ?? "",
                    // });

                    form.setFieldsValue({
                      user: record.name.firstname + " " + record.name.lastname,
                      email: record.email,
                      password: record.password,
                    });
                  },
                },
                {
                  key: "1",
                  label: <Link href={{ pathname: "#" }}>Suspend</Link>,
                },
              ],
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

  const paginatedData = getFilteredData().slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {/* Filters */}
      <ContentFilterUser filter={filter} setFilter={setFilter} />

      {/* Export & Search User */}
      <ContentExportSearchUser
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <div className="grid! grid-cols-12! overflow-hidden!">
        <div className="col-span-12!">
          <Table<DataType>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={searchValue ? getFilteredData() : paginatedData}
            showSorterTooltip={{ target: "sorter-icon" }}
            pagination={false}
            rowKey="id"
            className="w-full!"
            scroll={{ x: 800, y: 500 }}
          />
        </div>
      </div>

      <CustomPagination
        total={getFilteredData().length}
        pageSize={pageSize}
        current={currentPage}
        onChange={(page, newSize) => {
          setCurrentPage(page);
          if (newSize) setPageSize(newSize);
        }}
      />

      <Modal
        open={isModalOpen}
        closeIcon={false}
        closable={false}
        classNames={{ footer: "hidden!", body: "h-fit!" }}
      >
        <div>
          <h1 className="text-18-semiBold text-center">
            Edit User Information
          </h1>
          <p className="text-grayscale-400 text-center">
            Updating user details will receive a privacy audit.
          </p>
          <Form form={form} onFinish={putUser}>
            <div className="grid grid-cols-2 gap-4 py-3">
              <FormItemInput
                name="user"
                className="col-span-1!"
                inputProps={{
                  placeholder: "User",
                  className: "p-3! text-14-regular!",
                  // value: copyData.username,
                  // onChange: (e) =>
                  //   setCopyData({ ...copyData, username: e.target.value }),
                }}
              />

              <FormItemInput
                name="email"
                className="col-span-1!"
                inputProps={{
                  placeholder: "Email",
                  className: "p-3! text-14-regular!",
                }}
              />

              <FormItemInputPassword
                name="password"
                className="col-span-2!"
                inputProps={{
                  placeholder: "Password",
                  className: "p-3! text-14-regular!",
                  type: "password",
                  autoComplete: "false",
                }}
                rules={[
                  { required: true, message: "Password is required." },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                    message:
                      "The password must be at least 8 characters long and include uppercase and lowercase letters, numbers, and symbols.",
                  },
                ]}
              />
              <div className="flex justify-end col-span-2 gap-4">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <ButtonOutline onClick={handleCancel}>Cancel</ButtonOutline>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
      <Modal
        open={deleteModal}
        closeIcon={false}
        closable={false}
        classNames={{ footer: "hidden!", body: "h-fit!" }}
      >
        مههتسیمهلسیملتسخملتسثیختل
      </Modal>
    </div>
  );
}
