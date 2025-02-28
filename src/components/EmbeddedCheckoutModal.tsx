"use client";

import { type Dispatch, type SetStateAction, useCallback } from "react";

import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { env } from "~/env";
import Modal from "./ui/Modal";

import type { CheckoutItem } from "~/store/cartStore";

type StripeResponse = {
  id: string;
  clientSecret: string;
};

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);

export default function EmbeddedCheckoutModal({
  open,
  setOpen,
  checkoutItems,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  checkoutItems: CheckoutItem[];
}) {
  const fetchClientSecret = useCallback(async () => {
    const response = await fetch("/api/stripe/embedded-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: checkoutItems.map((item) => ({
          price_id: item.priceId,
          quantity: item.quantity,
          size: item.size,
        })),

        shipping: checkoutItems.some((item) => !item.digital),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    const data = (await response.json()) as StripeResponse;

    return data.clientSecret;
  }, [checkoutItems]);

  const options = { fetchClientSecret };

  return (
    <>
      <Modal open={open} setOpen={setOpen}>
        <div id="checkout">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </Modal>
    </>
  );
}
