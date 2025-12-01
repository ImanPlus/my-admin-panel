"use client";
import { Pagination, Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface CustomPaginationProps {
  total: number;
  pageSize: number;
  current?: number;
  onChange?: (page: number, pageSize: number) => void;
  pageSizeOptions?: number[];
}

export default function CustomPagination({
  total,
  pageSize,
  current = 1,
  onChange,
  pageSizeOptions = [5, 10, 20, 50]
}: CustomPaginationProps) {
  
  
  const handlePageSizeChange = (newPageSize: number) => {
    if (onChange) {
      onChange(1, newPageSize);
    }
  };

  const handlePageChange = (page: number) => {
    if (onChange) {
      onChange(page, pageSize);
    }
  };

  if (total <= pageSize && pageSizeOptions[0] >= total) return null;

  return (
    <div
      className="flex lg:justify-end justify-end items-center py-4 gap-11 "
      
    >
      <div className="flex items-center gap-2">
        <span className="lg:text-14-regular text-16-regular ">Number of rows per page:</span>
        <Select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="w-20 text-center "
          options={pageSizeOptions.map(size => ({
            value: size,
            label: size
          }))}
        />
      </div>

      <Pagination
        current={current}
        onChange={handlePageChange}
        className="ltr !gap-0 !m-0 pr-5! !rounded-sm"
        total={total}
        pageSize={pageSize}
        showSizeChanger={false}
        itemRender={(page, type, originalElement) => {
          if (type === "prev") {
            return (
              <div
                className={`flex text-grayscale-400 justify-center items-center h-full bg-grayscale-100 rounded-full hover:bg-primary-100 `}
              >
                <LeftOutlined />
              </div>
            );
          }
          if (type === "next") {
            return (
              <div
                className={`flex text-grayscale-400 justify-center items-center h-full bg-grayscale-100 rounded-full hover:bg-primary-100`}
              >
                <RightOutlined />
              </div>
            );
          }
          if (type === "page") {
            return (
              <div
                className={`${
                  current === page ? "border-r bg-blue-500 text-base-white!" : "bg-grayscale-100"
                } flex h-full w-full text-grayscale-400 pt-1 justify-center items-center border-grayscale-200 rounded-full hover:bg-primary-100`}
              >
                {page}
              </div>
            );
          }
          return originalElement;
        }}
      />
    </div>
  );
}