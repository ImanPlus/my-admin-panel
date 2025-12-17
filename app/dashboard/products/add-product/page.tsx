import ContentAddProduct from "@/components/content-add-product";
import { handleGetAllProduct } from "@/helper/api";

export default async function AddProduct() {
  const productList = await handleGetAllProduct();

  console.log("productList", productList);
  return (
    <div>
      <ContentAddProduct productList={productList?? []} />
    </div>
  );
}
