import FormItemInput from "./ui/input/form-item-input";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ContentTableProduct from "./content-table-product";
import Link from "next/link";

export default function ContentProductActions({
  searchValue,
  setSearchValue,
}: {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="bg-base-white rounded-2xl shadow-md">
      <div className="flex justify-between items-center p-4 gap-14">
        <FormItemInput
          inputProps={{
            placeholder: "Search",
            value: searchValue,
            onChange: (e) => handleSearch(e.target.value),
          }}
        />
        <Link href="/dashboard/products/add-product">
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
          </Button>
        </Link>
      </div>
      <ContentTableProduct searchValue={searchValue} />
    </div>
  );
}
