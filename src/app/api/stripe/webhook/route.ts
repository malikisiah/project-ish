import stripe from "~/utils/stripe";
import type Stripe from "stripe";
import { headers } from "next/headers";
import { type NextRequest } from "next/server";
import { EmailTemplate } from "~/components/EmailTemplate";
import resend from "~/utils/resend";
import type { ReactElement } from "react";
import { env } from "~/env";

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

  //const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case "checkout.session.completed": {
      const { error } = await resend.emails.send({
        from: "Malik <automation@updates.malikisiah.dev>",
        to: ["malikisiah214@gmail.com"],
        subject: "Hello world",
        react: EmailTemplate({ firstName: "John" }) as ReactElement,
      });

      if (error) {
        return Response.json({ error }, { status: 500 });
      }

      return Response.json({ message: "Checkout Completed" }, { status: 200 });
    }
  }
}
