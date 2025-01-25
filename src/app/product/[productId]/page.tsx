import Client from "./Client";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;
  console.log(productId);
  return <Client productId={productId} />;
}
