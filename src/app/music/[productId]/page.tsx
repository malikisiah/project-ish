import ProductOverView from "~/components/ProductOverView";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;
  //perform server side lookup of product info
  //includes images, price, product details
  return <ProductOverView />;
}
