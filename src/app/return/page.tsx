import stripe from "~/utils/stripe";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import OrderComplete from "~/components/OrderComplete";
import supabase from "~/utils/supabase";

import type { CheckoutItem } from "~/store/cartStore";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    line_items,
    amount_subtotal,
    amount_total,
    shipping_details,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  const items: CheckoutItem[] = [];
  if (status === "complete" && line_items) {
    for (const item of line_items.data) {
      const product = await db.product.findUniqueOrThrow({
        where: {
          priceId: item.price!.id,
        },
      });

      if (product.fileName) {
        const { data } = await supabase.storage
          .from("myBucket")
          .createSignedUrl(product.fileName, 86400);

        items.push({
          ...product,
          downloadURL: data?.signedUrl,
          quantity: item.quantity!,
        });
      } else {
        items.push({ ...product, quantity: item.quantity! });
      }
    }

    return (
      <OrderComplete
        items={items}
        total={amount_total!}
        subtotal={amount_subtotal!}
        shippingDetails={shipping_details}
      />
    );
  }
}
