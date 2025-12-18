import ContentAddProduct from "@/components/content-add-product";
import { handleGetAllProduct } from "@/helper/api";

export default async function AddProduct() {
  const productList = await handleGetAllProduct();
  
  return (
    <div>
      <ContentAddProduct productList={productList.data?? []} />
    </div>
  );
}
