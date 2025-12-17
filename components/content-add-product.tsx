"use client";

import { Button, Form, Upload, UploadProps } from "antd";
import ButtonOutline from "./ui/button/button-outline";
import FormItemInput from "./ui/input/form-item-input";
import TextEditor from "./ui/text-editor";
import { useState } from "react";
import useApp from "antd/es/app/useApp";
import { InboxOutlined } from "@ant-design/icons";
import FormItemInputSelect from "./ui/input/form-item-input-select";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export default function ContentAddProduct({
  productList,
}: {
  productList: ProductProps[];
}) {
  const [content, setContent] = useState("");
  const { Dragger } = Upload;
  const { notification } = useApp();

  console.log("content", content);

  const props: UploadProps = {
    name: "file",
    maxCount: 1,
    className: "!pb-4",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        notification.success({
          message: `${info.file.name} file uploaded successfully.`,
        });
      } else if (status === "error") {
        notification.error({
          message: `${info.file.name} file upload failed.`,
        });
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-20-semiBold">Add a new Product</h1>
          <p>Orders placed across your store</p>
        </div>
        <div className="flex gap-4">
          <ButtonOutline className="text-base-black!">Discard</ButtonOutline>
          <Button type="primary">Publish Product</Button>
        </div>
      </div>

      <Form>
        <div className="grid grid-cols-12 gap-4 my-5">
          <div className="col-span-8 flex flex-col gap-6">
            <div className=" bg-base-white shadow-md rounded-xl pb-8 pt-4 px-4 space-y-4">
              <h1 className="text-18-semiBold">Product information</h1>
              <FormItemInput
                name="title"
                inputProps={{
                  placeholder: "Title",
                }}
              />
              <div className="py-4">
                <TextEditor content={content} setContent={setContent} />
              </div>
            </div>
            <div className="flex flex-col gap-6 bg-base-white shadow-md rounded-xl p-4">
              <h1 className="text-18-semiBold">Product Image</h1>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </div>
            
          </div>

          <div className="col-span-4 flex flex-col gap-6">
            <div className="shadow-md rounded-xl p-4 space-y-4 bg-base-white">
              <h1 className="text-18-semiBold">Pricing</h1>
              <FormItemInput
                name="pricing"
                inputProps={{
                  placeholder: "Price",
                }}
              />
            </div>
            <div className="flex flex-col gap-3 bg-base-white shadow-md rounded-xl p-4">
              <h1 className="text-18-semiBold">Category</h1>
              <FormItemInputSelect
                name="category"
                labelCol={{ className: "text-14-regular" }}
                inputProps={{
                  placeholder: "Category",
                  className: "p-2 w-full text-14-regular",
                  options: productList.map((e) => ({
                    label: e.category,
                    value: e.id,
                  })),
                }}
              />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
