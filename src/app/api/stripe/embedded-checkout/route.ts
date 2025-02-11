import stripe from "~/utils/stripe";
import { type NextRequest, NextResponse } from "next/server";

interface RequestBody {
  price_ids: string[];
}

export async function POST(req: NextRequest) {
  const { price_ids } = (await req.json()) as RequestBody;

  const lineItems = price_ids.map((item) => ({ price: item, quantity: 1 }));

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: lineItems,
    mode: "payment",
    return_url: `${req.headers.get("origin")}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return NextResponse.json({ clientSecret: session.client_secret });
}
