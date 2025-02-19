"use client";

import { type Dispatch, type SetStateAction, useCallback } from "react";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { env } from "~/env";

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
        price_ids: checkoutItems.map((item) => item.priceId),
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
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative w-full max-w-6xl transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div id="checkout">
                <EmbeddedCheckoutProvider
                  stripe={stripePromise}
                  options={options}
                >
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
