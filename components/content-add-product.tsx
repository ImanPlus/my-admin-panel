"use client";

import { Button, Form, Upload, UploadFile } from "antd";
import ButtonOutline from "./ui/button/button-outline";
import FormItemInput from "./ui/input/form-item-input";
import TextEditor from "./ui/text-editor";
import { useState } from "react";
import useApp from "antd/es/app/useApp";
import { InboxOutlined } from "@ant-design/icons";
import FormItemInputSelect from "./ui/input/form-item-input-select";
import { promisePipe } from "@/helper/exception-handler";
import { handlePostAddProduct } from "@/helper/api";
import { useForm } from "antd/es/form/Form";
import { useRouter } from "next/navigation";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  file?: UploadFile;
}
export default function ContentAddProduct({
  productList,
}: {
  productList: ProductProps[];
}) {
  const { Dragger } = Upload;
  const { notification } = useApp();
  const [sending, setSending] = useState(false);
  const [form] = useForm();
  const router = useRouter();

  const handleAddProduct = (value: ProductProps) => {
    const formData = new FormData();
    formData.append("id", "1");
    formData.append("title", value.title);
    formData.append("price", value.price.toString());
    formData.append("description", value.description);
    formData.append("category", value.category);

    if (value.file) {
      formData.append("file", value?.file[0]?.orginalFileObj);
    }

    if (sending) return;
    setSending(true);

    promisePipe(
      handlePostAddProduct(formData)
        .then((res) => {
          if (res) {
            form.resetFields();
            console.log('res', res)
            notification.success({ message: "Product creation was successful." });
            // redirect("/dashboard/products/list-product");
            router.push('/dashboard/products/list-product');
          } else {
            notification.error({ message: res.message });
          }
        })
        .finally(() => setSending(false))
    );
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
          <Button type="primary" form="addProductForm" htmlType="submit">
            Publish Product
          </Button>
        </div>
      </div>

      <Form form={form} onFinish={handleAddProduct} name="addProductForm">
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

              <Form.Item name="description">
                <TextEditor />
              </Form.Item>
            </div>
            <div className="flex flex-col gap-6 bg-base-white shadow-md rounded-xl p-4">
              <h1 className="text-18-semiBold">Product Image</h1>
              <Form.Item
                name="fileupload"
                valuePropName="fileList"
                getValueFromEvent={(e) => e?.fileList}
              >
                <Dragger beforeUpload={() => false}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                </Dragger>
              </Form.Item>
            </div>
          </div>

          <div className="col-span-4 flex flex-col gap-6">
            <div className="shadow-md rounded-xl p-4 space-y-4 bg-base-white">
              <h1 className="text-18-semiBold">Pricing</h1>
              <FormItemInput
                name="price"
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
