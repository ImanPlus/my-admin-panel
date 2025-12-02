import {
  Dropdown,
  Button,
  Space,
  MenuProps,
  Modal,
  Form,
  notification,
  message,
  App,
} from "antd";
import {
  UploadOutlined,
  DownOutlined,
  PrinterOutlined,
  CopyOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import FormItemInput from "@/components/ui/form-item-input";
import Link from "next/link";
import { useState } from "react";
import ButtonOutline from "./ui/button-outline";
import { promisePipe } from "@/helper/exception-handler";
import handlePostNewUser from "@/helper/api";
import { useRouter } from "next/navigation";
import FormItemInputPassword from "./ui/form-item-input-password";
import { useForm } from "antd/es/form/Form";

export default function ContentExportSearchUser({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const { notification } = App.useApp();
  const router = useRouter();
  const [form] = useForm();

  // Modal
  const showModel = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  // Fetch API
  const handleAddUser = async (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    if (sending) return;
    setSending(true);

    promisePipe(
      handlePostNewUser(values.username, values.email, values.password)
        .then((res) => {
          if (res) {
            notification.success({ message: "User added successfully." });
            router.refresh();
            setIsModalOpen(false);
            form.resetFields();
          }
        })
        .catch((res: Error) => {
          notification.error({ message: res.message });
        })
    ).finally(() => setSending(false));
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

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
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
            value: searchValue,
            onChange: (e) => handleSearch(e.target.value),
          }}
        />
        <Button type="primary" onClick={showModel}>
          Add New User
        </Button>
      </div>

      <Modal
        open={isModalOpen}
        closeIcon={false}
        closable={false}
        classNames={{ footer: "!hidden", body: "!h-fit" }}
      >
        <div>
          <h1 className="text-18-semiBold">Add New User</h1>
          <Form
            onFinish={handleAddUser}
            id="addNewForm"
            className="border border-grayscale-100 p-5! flex flex-col gap-4"
          >
            <FormItemInput
              name="username"
              inputProps={{
                placeholder: "User Name",
                className: "p-3! text-14-regular!",
              }}
            />

            <FormItemInput
              name="email"
              inputProps={{
                placeholder: "Email",
                className: "p-3! text-14-regular!",
              }}
            />

            <FormItemInputPassword
              name="password"
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
          </Form>
          <div className="flex gap-3 my-3">
            <Button
              loading={sending}
              type="primary"
              htmlType="submit"
              form="addNewForm"
            >
              Submit
            </Button>
            <ButtonOutline onClick={handleCancel}>Cancel</ButtonOutline>
          </div>
        </div>
      </Modal>
    </div>
  );
}
