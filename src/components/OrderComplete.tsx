"use client";
import Image from "next/image";
import { useCartStore } from "~/store/cartStore";
import { useEffect } from "react";
import type { CheckoutItem } from "~/store/cartStore";
import type Stripe from "stripe";
import { ArrowDownOnSquareStackIcon } from "@heroicons/react/24/outline";

export default function OrderComplete({
  items,
  total,
  subtotal,
  shippingDetails,
}: {
  items: CheckoutItem[];
  total: number;
  subtotal: number;
  shippingDetails: Stripe.Checkout.Session.ShippingDetails | null;
}) {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-base font-medium text-primary">Thank you!</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Awesome Purchase!
          </p>
          <p className="mt-2 text-base text-gray-500">
            Your order has been processed.
            <br />
            <br />
            Digital items can be immediately downloaded
          </p>
        </div>

        <div className="mt-10 border-t border-gray-300">
          <h2 className="sr-only">Your order</h2>

          <h3 className="sr-only">Items</h3>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex space-x-6 border-b border-gray-300 py-10"
            >
              <Image
                width={600}
                height={600}
                alt=""
                src={item.image}
                className="size-20 flex-none rounded-lg bg-gray-300 object-cover sm:size-40"
              />
              <div className="">
                <div>
                  <h4 className="font-medium text-gray-900">
                    <a href={item.name}>{item.name}</a>
                  </h4>
                  {/* <p className="mt-2 text-sm text-gray-600">
                    {item.description}
                  </p> */}
                </div>
                <div className="mt-6 flex flex-1 items-end">
                  <dl className="flex divide-x divide-gray-200 text-sm">
                    <div className="flex pr-4 sm:pr-6">
                      <dt className="font-medium text-gray-900">Price</dt>
                      <dd className="ml-2 text-gray-700">
                        {`$${Math.trunc(item.priceInCents / 100).toFixed(2)}`}
                      </dd>
                    </div>
                    <div className="flex pl-4 sm:pl-6">
                      <dt className="font-medium text-gray-900">Quantity</dt>
                      <dd className="ml-2 text-gray-700">{item.quantity}</dd>
                    </div>
                  </dl>
                </div>
                {item.downloadURL && (
                  <div className="mt-4">
                    <a
                      target="_blank"
                      href={item.downloadURL}
                      className="flex items-center gap-1 font-medium text-gray-900 hover:text-gray-600"
                    >
                      <ArrowDownOnSquareStackIcon className="size-5" />
                      Download Here
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="sm:ml-40 sm:pl-6">
            {shippingDetails && (
              <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                <div>
                  <dt className="font-medium text-gray-900">
                    Shipping address
                  </dt>
                  <dd className="mt-2 text-gray-700">
                    <address className="not-italic">
                      <span className="block">Kristin Watson</span>
                      <span className="block">7363 Cynthia Pass</span>
                      <span className="block">Toronto, ON N3Y 4H8</span>
                    </address>
                  </dd>
                </div>
              </dl>
            )}

            <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-gray-700">{`$${Math.trunc(total / 100).toFixed(2)}`}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Tax</dt>
                <dd className="text-gray-700">{`$${Math.trunc((subtotal - total) / 100).toFixed(2)}`}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-medium text-gray-900">Subtotal</dt>
                <dd className="text-gray-900">{`$${Math.trunc(subtotal / 100).toFixed(2)}`}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
