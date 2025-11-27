import { Dropdown, Button, Space, MenuProps } from "antd";
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

export default function ContentExportSearchUser() {
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
          }}
        />
        <Button>Add New User</Button>
      </div>
    </div>
  );
}
