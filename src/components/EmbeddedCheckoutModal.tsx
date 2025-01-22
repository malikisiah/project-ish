"use client";

import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { env } from "~/env";

type StripeResponse = {
  id: string;
  clientSecret: string;
};

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);

export default function Page() {
  const fetchClientSecret = useCallback(async () => {
    const response = await fetch("/api/stripe/embedded-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    const data = (await response.json()) as StripeResponse;

    return data.clientSecret;
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
