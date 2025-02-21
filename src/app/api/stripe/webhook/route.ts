import stripe from "~/utils/stripe";
import type Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { EmailTemplate } from "~/components/EmailTemplate";
import resend from "~/utils/resend";

import { env } from "~/env";
import { trpc } from "~/trpc/server";
import { db } from "~/server/db";

import type { CheckoutItem } from "~/store/cartStore";

export async function POST(request: NextRequest) {
  const headersList = await headers();
  const body = await request.text();

  const signature = headersList.get("stripe-signature");
  if (!signature)
    return new Response("Error: Missing Signature Header", { status: 400 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_LOCAL);
  } catch (err) {
    if (err instanceof Error)
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return new Response(
      `Webhook Error: ${err instanceof Error && err.message}`,
      { status: 400 },
    );
  }

  const { id } = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case "checkout.session.completed": {
      const { customer_details, line_items } =
        await stripe.checkout.sessions.retrieve(id, {
          expand: ["line_items", "payment_intent"],
        });

      if (customer_details && line_items) {
        const products: CheckoutItem[] = [];
        console.log(line_items);
        for (const item of line_items.data) {
          console.log(item.price?.metadata);
          const product = await db.product.findUniqueOrThrow({
            where: { priceId: item.price!.id },
          });

          if (!product.digital) {
            products.push({ ...product, quantity: item.quantity! });
          }
        }

        if (products.length > 0) {
          const { error } = await resend.emails.send({
            from: "Malik <automation@updates.malikisiah.dev>",
            to: ["malikisiah214@gmail.com"],
            subject: "Order has been Placed!",
            react: EmailTemplate({
              customerDetails: customer_details,
              products: products,
            }),
          });

          if (error) {
            console.log(error.message);
          }

          await trpc.api.discordEvent({
            message: `**${customer_details.name}** has placed an order!\n\n${products.map((item) => `(${item.name}) x ${item.quantity}`).join("\n")}\n\n${customer_details.address?.line1}${customer_details.address?.line2 ? "\n" + customer_details.address.line2 : "\n"}\n${customer_details.address?.city}, ${customer_details.address?.state} ${customer_details.address?.postal_code}`,
            channel: "orders",
          });
        }

        return NextResponse.json(
          { message: "Checkout Completed" },
          { status: 200 },
        );
      }
    }
  }

  return NextResponse.json(
    {
      message: "Invalid Stripe Event",
    },
    { status: 200 },
  );
}
