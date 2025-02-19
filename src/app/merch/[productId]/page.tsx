import ProductOverview from "~/components/ProductOverview";
import { db } from "~/server/db";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const productId = (await params).productId;
  const product = await db.product.findUniqueOrThrow({
    where: {
      uuid: productId,
    },
  });
  return <ProductOverview product={product} />;
}
