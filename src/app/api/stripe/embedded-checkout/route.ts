import stripe from "~/utils/stripe";
import { type NextRequest, NextResponse } from "next/server";

interface RequestBody {
  data: {
    price_id: string;
    quantity: number;
  }[];
}

export async function POST(req: NextRequest) {
  const { data } = (await req.json()) as RequestBody;

  const lineItems = data.map((item) => ({
    price: item.price_id,
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: lineItems,
    mode: "payment",
    return_url: `${req.headers.get("origin")}/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  return NextResponse.json({ clientSecret: session.client_secret });
}
