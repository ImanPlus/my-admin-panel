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
} from "@ant-design/icons";
import { Button, Dropdown, Form, MenuProps, Space } from "antd";
import Link from "next/link";

export default function ListOfUsers() {
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

        <div className="p-5">
          <Dropdown menu={{ items, className: "border border-grayscale-200" }}>
            <Button icon={<UploadOutlined />} className="text-grayscale-500! bg-base-white! border border-[#6D788D]!">
              <Space>
                Export
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
