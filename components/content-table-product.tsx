import {
  App,
  Button,
  Dropdown,
  MenuProps,
  message,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DeleteOutlined,
  DesktopOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { promisePipe } from "@/helper/exception-handler";
import { handleGetAllProduct } from "@/helper/api";
import { randomNumber } from "@/helper/method";
import CustomPagination from "./custom-pagination";

interface DataType {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: {
    count: number;
  };
  status: number;
}
type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

export default function ContentTableProduct({
  searchValue,
}: {
  searchValue: string;
}) {
  // States
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sending, setSending] = useState(false);
  const [dataProduct, setDataProduct] = useState<DataType[]>([]);
  const { notification } = App.useApp();

  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch API
  const getProduct = async () => {
    if (sending) return;
    setSending(true);

    promisePipe(
      handleGetAllProduct()
        .then(async (res: DataType[]) => {
          if (res.length) {
            setDataProduct(
              res.map((e, i) => ({
                id: e.id,
                title: e.title,
                price: e.price,
                category: e.category,
                image: e.image,
                rating: {
                  count: e.rating.count,
                },
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
    getProduct();
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

  // Columns
  const columns: TableColumnsType<DataType> = [
    {
      key: "product",
      title: "PRODUCT",
      dataIndex: "product",
      render: (_, record) => (
        <div className="flex gap-3 items-center">
          <Image src={record.image} alt={record.title} width={40} height={40} />
          {record.title}
        </div>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
      defaultSortOrder: "descend",
      className: "text-grayscale-500",
    },
    {
      key: "category",
      title: "CATEGORY",
      dataIndex: "category",
      render: (_, record) => (
        <div className="flex gap-2">
          <DesktopOutlined />
          {record.category}
        </div>
      ),
      sorter: (a, b) => a.category.localeCompare(b.category),
      defaultSortOrder: "descend",
    },
    {
      key: "price",
      title: "PRICE",
      dataIndex: "price",
      render: (_, record) => record.price,
      sorter: (a, b) => a.price - b.price,
      defaultSortOrder: "descend",
    },
    {
      key: "qty",
      title: "QTY",
      dataIndex: "qty",
      render: (_, record) => record.rating.count,
      sorter: (a, b) => a.price - b.price,
      defaultSortOrder: "descend",
    },
    {
      key: "status",
      title: "STATUS",
      dataIndex: "status",
      render: (_, record) => (
        <Tag
          bordered={false}
          color={
            record.status === 1
              ? "success"
              : record.status === 2
              ? "default"
              : record.status === 3
              ? "warning"
              : "error"
          }
        >
          <span>
            {record.status === 1
              ? "Publish"
              : record.status === 3
              ? "Scheduled"
              : record.status === 4
              ? "Inactive"
              : "unknown"}
          </span>
        </Tag>
      ),
      sorter: (a, b) => a.category.localeCompare(b.category),
      defaultSortOrder: "descend",
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

  // Filter Table by Search bar
  const getFilteredData = () => {
    return dataProduct.filter((item) => {
      const searchMatch = searchValue
        ? Object.values(item).some(
            (value) =>
              value !== null &&
              value !== undefined &&
              String(value).toLowerCase().includes(searchValue.toLowerCase())
          )
        : true;

      return searchMatch;
    });
  };

  // Pagination
  const paginatedData = getFilteredData().slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <div className="grid! grid-cols-12! overflow-hidden!">
        <div className="col-span-12!">
          <Table<DataType>
            rowSelection={rowSelection}
            columns={columns}
            dataSource={searchValue ? getFilteredData() : paginatedData}
            rowKey="id"
            pagination={false}
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
    </div>
  );
}
